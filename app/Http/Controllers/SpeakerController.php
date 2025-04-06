<?php

namespace App\Http\Controllers;

use App\Models\Edition;
use App\Models\Speaker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SpeakerController extends Controller
{
    public function index()
    {
        $speakers = Speaker::with('editions')->get();
        $editions = Edition::select('id', 'year')->get();
        return Inertia::render('speakers/index', [
            'speakers' => $speakers,
            'editions' => $editions
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'position' => 'required',
            'linked' => 'required|url',
            'image' => 'required|image|mimes:png,jpg,jpeg',
            'editions' => 'required',
        ]);

        $file = $request->file('image');
        $fileName = $file->store('images/speakers', 'public');


        $speaker = Speaker::create([
            'name' => $request->name,
            'position' => $request->position,
            'linkedin' => $request->linked,
            'image' => $fileName,
        ]);

        $speaker->editions()->attach($request->editions);
    }

    public function update(Request $request, Speaker $speaker)
    {
        $request->validate([
            'name' => 'required',
            'position' => 'required',
            'linked' => 'required',
            'editions' => 'required',
        ]);

        if ($request->image != $speaker->image) {
            // delete old image
            Storage::disk('public')->delete($speaker->image);

            // store new one
            $file = $request->file('image');
            $fileName = $file->store('images/speakers', 'public');
        }

        $speaker->update([
            'name' => $request->name,
            'position' => $request->position,
            'linkedin' => $request->linked,
            'image' => $fileName,
        ]);

        $speaker->editions()->sync($request->editions);
    }


    public function destroy(Speaker $speaker)
    {
        Storage::disk('public')->delete($speaker->image);
        $speaker->delete();
    }
}
