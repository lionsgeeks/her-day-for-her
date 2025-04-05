<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('contact/index');
    }
    public function adminindex()
    {
        //
        return Inertia::render('contact/messages' ,[
            "messages"=>Contact::all(),
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $request->validate([
            "name"=>"required",
            "email"=>"required",
            "message"=>"required",
            "subject"=>"required",

        ]);
        Contact::create([
            "name"=>$request->name,
            "email"=>$request->email,
            "message"=>$request->message,
            "subject"=>$request->subject,
            "status"=>"unread",
        ]);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        //

        $contact->update([
            "status"=>"read",
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        //

        $contact->delete();
        return back();
    }
}
