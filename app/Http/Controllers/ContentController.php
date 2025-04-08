<?php

namespace App\Http\Controllers;

use App\Models\Content;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ContentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function hero()
    {
        $hero = Content::where("section", "hero")->first();
        return Inertia::render("content/hero-panel", ["hero" => $hero]);
    }
    public function about()
    {
        $about = Content::where("section", "about")->first();
        return Inertia::render("content/about-panel", ["about" => $about]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        // todo : remove  uncessery image store 
        $validated = $request->validate([
            'section' => 'required|string',
            'content' => 'required',
        ]);

        $contentData = $request->content;

        if ($contentData['image'] && !is_string($contentData['image'])) {
            $path = $contentData["image"]->store('hero_images', 'public');
            $contentData['image'] = Storage::url($path);
        }

        
        // if ($contentData['image'] && !is_string($contentData['image'])) {

        //     $myImageName = Content::where("section", "hero")->first()->content["image"];
            
        //     $imagePath = 'hero_images/' . basename($myImageName);
        
        //     if (Storage::disk('public')->exists($imagePath)) {
        //         Storage::disk('public')->delete($imagePath);
        //     }
        //     $file = file_get_contents($contentData['image']);    

        //     Storage::disk('public')->put($imagePath, $file);
        // }

        
        
        Content::updateOrCreate(
            ['section' => $validated['section']],
            ['content' => $contentData]
        );

        return back();
    }

    /**
     * Store a newly created resource in storage.
     */


    /**
     * Display the specified resource.
     */
    public function show(Content $content)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Content $content)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Content $content)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Content $content)
    {
        //
    }
}
