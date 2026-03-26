'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

/** Must match `RegistrationController::REGISTRATION_TYPES` */
export const REGISTRATION_TYPES = [
    'Partenaire',
    'Bénévole',
    'Presse',
    'Amis de Jadara',
    'Invités',
];

export const REGISTER_HASH = '#register';

function isRegisterHash() {
    if (typeof window === 'undefined') return false;
    return window.location.hash === REGISTER_HASH;
}

function openRegistrationModal() {
    window.location.hash = REGISTER_HASH.slice(1); // 'register'
}

/** Trigger-only button: use when the actual modal is rendered elsewhere (e.g. in layout). Prevents multiple modals. */
export function RegistrationModalTrigger({ className, children, ...buttonProps }) {
    return (
        <Button
            size="lg"
            className={className ?? 'bg-beta/70 text-white hover:bg-alpha/80 hover:cursor-pointer'}
            onClick={openRegistrationModal}
            {...buttonProps}
        >
            {children ?? 'Get Your Tickets'}
        </Button>
    );
}

export function RegistrationModal({ triggerOnly = false }) {
    const [step, setStep] = useState(1);
    const [open, setOpen] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);

    // Open modal when URL has #register (shareable link)
    useEffect(() => {
        setOpen(isRegisterHash());
        const handleHashChange = () => setOpen(isRegisterHash());
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const handleOpenChange = (nextOpen) => {
        setOpen(nextOpen);
        if (nextOpen) {
            const url = `${window.location.pathname}${window.location.search}${REGISTER_HASH}`;
            window.history.replaceState(null, '', url);
        } else {
            const url = window.location.pathname + window.location.search;
            window.history.replaceState(null, '', url);
        }
    };

    if (triggerOnly) {
        return <RegistrationModalTrigger />;
    }
    // Replace local state with Inertia's useForm

    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        type: '',
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
        post('/tickets', {
            onSuccess: () => {
                setStep(4);
            },
            onError: (errs) => {
                if (errs?.email) setStep(1);
                else if (errs?.type) setStep(2);
            },
        });
    };

    const registrationLink = typeof window !== 'undefined'
        ? `${window.location.origin}${window.location.pathname}${window.location.search}${REGISTER_HASH}`
        : '';

    const copyRegistrationLink = () => {
        if (!registrationLink) return;
        navigator.clipboard.writeText(registrationLink).then(() => {
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 2000);
        });
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button  size="lg" className="bg-beta/70  text-white hover:bg-alpha/80 hover:cursor-pointer">
                    {/* <a target='_blank'  href=' https://www.billetteries.ma/billetterie/her-day-for-her'>
                    Get Your Tickets
                    </a> */}
                    Get Your Tickets
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Register for Her Day for Her 2025</DialogTitle>
                    <DialogDescription>
                        {step === 1 && 'Please provide your personal information.'}
                        {step === 2 && 'Select your ticket type and additional information.'}
                        {step === 3 && 'Review and confirm your registration.'}
                    </DialogDescription>
                    {/* <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2 flex-wrap">
                        Share this page with the link:
                        <Button type="button" variant="ghost" size="sm" className="h-7 text-xs" onClick={copyRegistrationLink}>
                            {linkCopied ? 'Copied!' : 'Copy link'}
                        </Button>
                    </p> */}
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <div className="grid gap-4 py-4">
                            {(errors.email || errors.phone || errors.first_name || errors.last_name) && (
                                <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                                    {errors.email ?? 'Please fix the highlighted fields and try again.'}
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first_name">First name</Label>
                                    <Input id="first_name" name="first_name" value={data.first_name} onChange={handleChange} required />
                                    {errors.first_name && <p className="text-xs text-red-600">{errors.first_name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last_name">Last name</Label>
                                    <Input id="last_name" name="last_name" value={data.last_name} onChange={handleChange} required />
                                    {errors.last_name && <p className="text-xs text-red-600">{errors.last_name}</p>}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" value={data.email} onChange={handleChange} required />
                                {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone number</Label>
                                <Input id="phone" name="phone" type="tel" value={data.phone} onChange={handleChange} required />
                                {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="type">Type</Label>
                                <Select
                                    value={data.type || undefined}
                                    onValueChange={(value) => setData('type', value)}
                                >
                                    <SelectTrigger id="type" className="w-full">
                                        <SelectValue placeholder="Sélectionner un type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {REGISTRATION_TYPES.map((t) => (
                                            <SelectItem key={t} value={t}>
                                                {t}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.type && <p className="text-xs text-red-600">{errors.type}</p>}
                            </div>
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
                                    <div className="font-medium">Type:</div>
                                    <div>{data.type || '—'}</div>
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
                                {errors.agree_terms && <p className="text-xs text-red-600">{errors.agree_terms}</p>}

                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="grid gap-4 py-4">
                            <div className="rounded-md border border-green-200 bg-green-50 px-3 py-3 text-sm text-green-800">
                                <div className="font-semibold mb-1">Registration completed</div>
                                <div>
                                    We received your registration. Our team is examining it now. You will receive an invitation email if it’s approved.
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
                            ) : step === 3 ? (
                                <Button type="submit" className="bg-[#03329b]" disabled={processing}>
                                    Complete Registration
                                </Button>
                            ) : (
                                <Button type="button" onClick={() => handleOpenChange(false)}>
                                    Close
                                </Button>
                            )}
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
