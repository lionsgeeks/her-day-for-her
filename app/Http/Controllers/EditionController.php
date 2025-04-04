<?php

namespace App\Http\Controllers;

use App\Models\Edition;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EditionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('editions/admin/index', [
            'editions' => Edition::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('editions/admin/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'year' => 'required',
            'description' => 'required|string',
            'date' => 'required|date',
            'google_map_url' => 'required|string',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'venue' => 'required|string|max:255',
            'is_active' => 'boolean',
        ]);
        // dd($request);

        Edition::create([
            'name' => $validated['name'],
            'year' => $validated['year'],
            'description' => $validated['description'],
            'date' => $validated['date'],
            'google_map_url' => $validated['google_map_url'],
            'city' => $validated['city'],
            'country' => $validated['country'],
            'venue' => $validated['venue'],
            'is_active' => $request->has('is_active'),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Edition $edition)
    {
        return Inertia::render('editions/admin/[id]/index', [
            'edition' => $edition,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Edition $edition)
    {
        return Inertia::render('editions/admin/[id]/edit',[
            'edition' => $edition,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Edition $edition)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'year' => 'required',
            'description' => 'required|string',
            'date' => 'required|date',
            'google_map_url' => 'required|string',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'venue' => 'required|string|max:255',
            'is_active' => 'boolean',
        ]);
        $edition->update([
            'name' => $validated['name'],
            'year' => $validated['year'],
            'description' => $validated['description'],
            'date' => $validated['date'],
            'google_map_url' => $validated['google_map_url'],
            'city' => $validated['city'],
            'country' => $validated['country'],
            'venue' => $validated['venue'],
            'is_active' => $request->has('is_active'),
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Edition $edition)
    {
        $edition->delete();
    }
}
