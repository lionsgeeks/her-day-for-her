<?php

namespace App\Http\Controllers;

use App\Models\Edition;
use App\Models\Gallery;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function index()
    {
        $galleries = Gallery::with('images')->with('edition')->get();
        $editions = Edition::select('id', 'year')->get();
        return Inertia::render('gallery/index', [
            'editions' => $editions,
            'galleries' => $galleries,
        ]);
    }

    public function frontPage()
    {
        $images = Image::where('imageable_type', 'App\Models\Gallery')->get()->shuffle();
        $editions = Edition::select('id', 'year')->with('galleries')->get();
        $galleries = Gallery::all();
        return Inertia::render('gallery/front/index', [
            'images' => $images,
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


        // I'M A GENIUS HAHAHAHA
        $gallery = Gallery::firstOrCreate(['edition_id' => $request->edition]);

        foreach ($request->images as $image) {
            $fileName = $image->store('images/gallery', 'public');
            $gallery->images()->create([
                'path' => $fileName,
            ]);
        }

    }



    public function destroy(Gallery $gallery)
    {
        foreach ($gallery->images as $image) {
            Storage::disk('public')->delete($image->path);
        }
        $gallery->images()->delete();
        $gallery->delete();
    }
}
