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
        return Inertia::render("content/hero/hero-panel", ["hero" => $hero]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function heroStore(Request $request)
    {

        $validated = $request->validate([
            'section' => 'required|string',
            'content' => 'required',
            'image' => 'nullable|image|max:3072',
        ]);

        $contentData = $request->content;

        if ($contentData['image']) {
            $path = $contentData["image"]->store('hero_images', 'public');
            $contentData['image'] = Storage::url($path);
        }

        Content::updateOrCreate(
            ['section' => $validated['section']],
            ['content' => $contentData]
        );

        return response()->json(["message" => "Hero content saved successfully"]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

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
