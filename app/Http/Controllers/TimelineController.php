<?php

namespace App\Http\Controllers;

use App\Models\Edition;
use App\Models\Timeline;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TimelineController extends Controller
{
    public function index()
    {
        $timelineEvents = Timeline::all();
        $editions = Edition::all();
        return Inertia::render('timeline/index', [
            'timelineEvents' => $timelineEvents,
            'editions' => $editions,
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'date' => 'required',
            'edition' => 'required',
            'startTime' => 'required',
            'endTime' => 'required',
            'description' => 'nullable',
        ]);

        Timeline::create([
            'title' => $request->title,
            'date' => $request->date,
            'edition_id' => $request->edition,
            'startTime' => $request->startTime,
            'endTime' => $request->endTime,
            'description' => $request->description ?? null,
        ]);
    }

    public function update(Request $request, Timeline $timeline)
    {
        $request->validate([
            'title' => 'required',
            'date' => 'required',
            'edition' => 'required',
            'startTime' => 'required',
            'endTime' => 'required',
        ]);

        $timeline->update([
            'title' => $request->title,
            'date' => $request->date,
            'edition_id' => $request->edition,
            'startTime' => $request->startTime,
            'endTime' => $request->endTime,
            'description' => $request->description ?? null,
        ]);
    }

    public function destroy(Timeline $timeline)
    {
        $timeline->delete();
    }
}
