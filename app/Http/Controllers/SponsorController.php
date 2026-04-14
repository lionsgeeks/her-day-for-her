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
            'sponsors' => Sponsor::with('images', 'editions')->get(),
            'editions' => Edition::all(),
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'required|image|max:2048',
            'editions' => 'nullable|array',
            'editions.*' => 'exists:editions,id',
        ]);

        $logoPath = null;
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('sponsors', 'public');
        }
        $sponsor = Sponsor::create([
            'name' => $validated['name'],
            'logo' => $logoPath,
        ]);
        $sponsor->editions()->sync($request->editions ?? []);
        $sponsor->images()->create(["path" => $logoPath]);

        return back();
    }

    public function update(Request $request, Sponsor $sponsor)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|image|max:2048',
            'editions' => 'nullable|array',
            'editions.*' => 'exists:editions,id',
        ]);

        $sponsor->name = $validated['name'];

        if ($request->hasFile('logo')) {
            foreach ($sponsor->images as $image) {
                Storage::disk('public')->delete($image->path);
                $image->delete();
            }

            $logoPath = $request->file('logo')->store('sponsors', 'public');
            $sponsor->logo = $logoPath;
            $sponsor->images()->create(['path' => $logoPath]);
        }

        $sponsor->save();
        $sponsor->editions()->sync($request->editions ?? []);

        return back();
    }

    public function destroy(Sponsor $sponsor) {
        foreach ($sponsor->images as $image) {
            Storage::disk("public")->delete($image->path);
            $image->delete(); 
        }

        $sponsor->delete();

        return back();
    }
}
