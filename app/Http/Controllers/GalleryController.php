<?php

namespace App\Http\Controllers;

use App\Models\Edition;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function index()
    {
        $galleries = Gallery::with('images')->with('edition')->get();
        $editions = Edition::all();
        return Inertia::render('gallery/index', [
            'editions' => $editions,
            'galleries' => $galleries,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'edition' => 'required',
            'images' => 'required',
        ]);

        $gallery = Gallery::create([
            'edition_id' => $request->edition,
        ]);

        foreach ($request->images as $key => $value) {
            $file = $value;
            $fileName = $file->store('images/gallery', 'public');
            $gallery->images()->create([
                'path' => $fileName,
            ]);
        }
    }



    public function destroy(Gallery $gallery)
    {
        foreach($gallery->images as $image)
        {
            Storage::disk('public')->delete($image->path);
        }
        $gallery->images()->delete();
        $gallery->delete();
    }
}
