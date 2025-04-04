<?php

namespace App\Http\Controllers;

use App\Models\Speaker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SpeakerController extends Controller
{
    public function index()
    {
        $speakers = Speaker::all();
        return Inertia::render('speakers/index', [
            'speakers' => $speakers
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'position' => 'required',
            'linked' => 'required|url',
            'image' => 'required|image|mimes:png,jpg,jpeg'
        ]);

        $file = $request->file('image');
        $filaName = $file->store('images/speakers', 'public');


        Speaker::create([
            'name' => $request->name,
            'position' => $request->position,
            'linkedin' => $request->linked,
            'image' => $filaName,
        ]);
    }


    public function destroy(Speaker $speaker)
    {
        Storage::disk('public')->delete($speaker->image);
        $speaker->delete();

    }
}
