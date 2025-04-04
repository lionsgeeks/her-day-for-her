<?php

namespace App\Http\Controllers;

use App\Models\Timeline;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TimelineController extends Controller
{
    public function index()
    {
        $timelineEvents = Timeline::all();
        return Inertia::render('timeline/index', [
            'timelineEvents' => $timelineEvents,
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'date' => 'required',
            'edition' => 'required',
            'startTime' => 'required',
            'endTime' => 'required'
        ]);

        Timeline::create([
            'title' => $request->title,
            'date' => $request->date,
            'edition' => $request->edition,
            'startTime' => $request->startTime,
            'endTime' => $request->endTime,
        ]);
    }


    public function destroy(Timeline $timeline)
    {
        $timeline->delete();
    }
}
