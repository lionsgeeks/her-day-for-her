<?php

namespace App\Http\Controllers;

use App\Models\Edition;
use App\Models\Sponsor;
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
            'editions' => Edition::with('sponsors.images', 'speakers', 'registrations', 'galleries.images' )->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return Inertia::render('editions/admin/create', [
            'sponsors' => Sponsor::with('images')->get(),
        ]);
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
            'email' => 'required|string',
            'phone' => 'required|string',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'venue' => 'required|string|max:255',
            'isActive' => 'required|boolean',
        ]);
        if ($validated['isActive']) {
            Edition::where('is_active', true)->update(['is_active' => false]);
        }
        $edition = Edition::create([
            'name' => $validated['name'],
            'year' => $validated['year'],
            'description' => $validated['description'],
            'date' => $validated['date'],
            'google_map_url' => $validated['google_map_url'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'city' => $validated['city'],
            'country' => $validated['country'],
            'venue' => $validated['venue'],
            'is_active' => $validated['isActive'],
        ]);
        $assignedSponsors = $request->selectedSponsors;
        foreach ($assignedSponsors as $sponsor) {
            $edition->sponsors()->attach($sponsor);
        };

        // dd($assignedSponsors);
    }

    /**
     * Display the specified resource.
     */
    public function show(Edition $edition)
    {
        return Inertia::render('editions/admin/[id]/index', [
            'edition' => $edition->load('sponsors.images', 'speakers', 'registrations', 'galleries.images'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Edition $edition)
    {
        $edition->load('sponsors.images');
        return Inertia::render('editions/admin/[id]/edit', [
            'edition' => $edition,
            'sponsors' => Sponsor::whereNotIn('id', function ($query) use ($edition) {
                $query->select('sponsor_id')
                    ->from('edition_sponsors')
                    ->where('edition_id', $edition->id);
            })->with('images')->get(),
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
            'isActive' => 'boolean',
        ]);
        if ($validated['isActive']) {
            Edition::where('is_active', true)->update(['is_active' => false]);
        }
        $edition->update([
            'name' => $validated['name'],
            'year' => $validated['year'],
            'description' => $validated['description'],
            'date' => $validated['date'],
            'google_map_url' => $validated['google_map_url'],
            'city' => $validated['city'],
            'country' => $validated['country'],
            'venue' => $validated['venue'],
            'is_active' => $validated['isActive'],
        ]);
        $edition->sponsors()->sync($request->selectedSponsors ?? []);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Edition $edition)
    {
        $edition->delete();
    }

    public function pastEditions(){
        $editions = Edition::wherenot("is_active", 1)
            ->with(['sponsors.images', 'speakers', 'galleries.images', 'registrations'])
            ->get();


        return Inertia::render("editions/user/past-editions", [
            "editions" => $editions
        ]);
    }

}
