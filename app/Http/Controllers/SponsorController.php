<?php

namespace App\Http\Controllers;

use App\Models\Edition;
use App\Models\Sponsor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SponsorController extends Controller
{
    public function index()
    {
        return Inertia::render('sponsors/admin/index', [
            'sponsors' => Sponsor::with('images')->get(),
            "image_url" => asset('storage/'),
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'required|image|max:2048',
        ]);
        $logoPath = null;
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('sponsors', 'public');
        }
        $sponsor = Sponsor::create([
            'name' => $validated['name'],
            'logo' => $logoPath,
        ]);
        // $edition = Edition::latest()->first();
        // $sponsor->editions()->attach($edition->id);
        $sponsor->images()->create(["path" => $logoPath]);
        // dd($edition);
    }
    public function destroy(Sponsor $sponsor) {
        $sponsor->delete();
        foreach ($sponsor->images as $image) {
            Storage::disk("public")->delete($image->path);
            $image->delete(); 
        }
    }
}
