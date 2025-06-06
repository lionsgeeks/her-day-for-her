'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export function RegistrationModal() {
    const [step, setStep] = useState(1);
    const [open, setOpen] = useState(false);
    // Replace local state with Inertia's useForm

    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company: '',
        job_title: '',
        dietary_restrictions: 'none',
        agree_terms: false,
        agree_privacy: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (name, checked) => {
        setData((prev) => ({ ...prev, [name]: checked }));
    };

    const nextStep = () => {
        setStep((prev) => prev + 1);
    };

    const prevStep = () => {
        setStep((prev) => prev - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', data);
        setOpen(false);
        post('/tickets');
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button  size="lg" className="bg-beta/70  text-white hover:bg-alpha/80 hover:cursor-pointer">
                    <a target='_blank'  href=' https://www.billetteries.ma/billetterie/her-day-for-her'>
                    Get Your Tickets
                    </a>
                </Button>
            </DialogTrigger>
            {/* <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Register for Her Day for Her 2025</DialogTitle>
                    <DialogDescription>
                        {step === 1 && 'Please provide your personal information.'}
                        {step === 2 && 'Select your ticket type and additional information.'}
                        {step === 3 && 'Review and confirm your registration.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first_name">First name</Label>
                                    <Input id="first_name" name="first_name" value={data.first_name} onChange={handleChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last_name">Last name</Label>
                                    <Input id="last_name" name="last_name" value={data.last_name} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" value={data.email} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone number</Label>
                                <Input id="phone" name="phone" type="tel" value={data.phone} onChange={handleChange} required />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="company">Company/Organization</Label>
                                <Input id="company" name="company" value={data.company} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="job_title">Job Title</Label>
                                <Input id="job_title" name="job_title" value={data.job_title} onChange={handleChange} />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="grid gap-4 py-4">
                            <div className="space-y-4">
                                <h3 className="font-medium">Registration Summary</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="font-medium">Name:</div>
                                    <div>
                                        {data.first_name} {data.last_name}
                                    </div>
                                    <div className="font-medium">Email:</div>
                                    <div>{data.email}</div>
                                    <div className="font-medium">Phone:</div>
                                    <div>{data.phone}</div>
                                    <div className="font-medium">Company:</div>
                                    <div>{data.company || 'N/A'}</div>
                                    <div className="font-medium">Job Title:</div>
                                    <div>{data.job_title || 'N/A'}</div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="agree_terms"
                                        checked={data.agree_terms}
                                        onCheckedChange={(checked) => handleCheckboxChange('agree_terms', checked)}
                                        required
                                    />
                                    <Label htmlFor="agree_terms">I agree to the terms and conditions*</Label>
                                </div>

                            </div>
                        </div>
                    )}

                    <DialogFooter className="flex justify-between">
                        {step > 1 && (
                            <Button type="button" variant="outline" onClick={prevStep}>
                                Back
                            </Button>
                        )}
                        <div>
                            {step < 3 ? (
                                <Button type="button" onClick={nextStep}>
                                    Next
                                </Button>
                            ) : (
                                <Button type="submit" className="bg-[#03329b]">
                                    Complete Registration
                                </Button>
                            )}
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent> */}
        </Dialog>
    );
}
