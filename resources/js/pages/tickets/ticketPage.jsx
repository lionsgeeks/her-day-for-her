// import Image from "next/image"
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Calendar, Download, MapPin, Printer, Share2 } from 'lucide-react';

export default function TicketPage({ registration, editionYear, editionName, editionCity }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 py-12">
            <div className="container max-w-4xl">
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-3xl font-bold">Your Conference registration</h1>
                    {/* here the conference data need to be updated by edition year */}
                    <p className="text-muted-foreground">Thank you for registering for Her Day for Her Conference { editionYear }</p>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow-lg">
                    <div className="bg-gradient-to-r from-alpha to-beta p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="rounded-full bg-white p-1">
                                    <div className="h-8 w-8 rounded-full bg-alpha"></div>
                                </div>
                                <span className="text-xl font-bold">Her Day for Her</span>
                            </div>
                            <div className="text-right">
                                <div className="text-sm opacity-80">Ticket #</div>
                                <div className="font-bold">HDH2025-12345</div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b p-6">
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="space-y-4 md:col-span-2">
                                <div>
                                    <h2 className="text-2xl font-bold">Professional Pass</h2>
                                    <p className="text-muted-foreground">Her Day for Her Conference {editionYear}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-muted-foreground text-sm">Attendee</div>
                                        <div className="font-medium">
                                            {registration.first_name} {registration.last_name}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground text-sm">Email</div>
                                        <div className="font-medium">{registration.email}</div>
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground text-sm">Company</div>
                                        <div className="font-medium">{registration.company}</div>
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground text-sm">Job Title</div>
                                        <div className="font-medium">{registration.job_title}</div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 pt-2 sm:flex-row ">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-[#fd5f90]" />
                                        {/* here the conference data need to be updated by edition year */}
                                        <span>June 15-17, 2025</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-[#fd5f90]" />
                                        {/* here the conference data need to be updated by editionplace */}
                                        <span>Grand Conference Center, {editionCity}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center">
                                <div className="mb-2 rounded-lg border bg-white p-2">
                                    <img
                                        // src={`storage/${registration.qr_code}`}
                                        src={`/storage/${registration.qr_code}`}
                                        alt="QR Code"
                                        width={200}
                                        height={200}
                                        className="h-auto w-full"
                                    />
                                </div>
                                <p className="text-muted-foreground text-center text-xs">Present this QR code at the registration desk</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <h3 className="mb-4 font-semibold">Ticket Includes:</h3>
                        <ul className="mb-6 space-y-2">
                            <li className="flex items-start gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5 text-alpha"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Access to all talks and workshops</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5 text-alpha"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Conference materials</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5 text-alpha"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Lunch and refreshments</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5 text-alpha"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Networking events</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5 text-alpha"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Digital certificate</span>
                            </li>
                        </ul>

                        <div className="flex flex-wrap justify-center gap-3">
                            <a href={`/ticket/pdf/${registration.id}`}>
                                    <Button variant="outline" className="flex items-center gap-2">
                                        <Download className="h-4 w-4" />
                                        <span>Download Ticket</span>
                                    </Button>
                            </a>
                            {/* <Button variant="outline" className="flex items-center gap-2">
                                <Printer className="h-4 w-4" />
                                <span>Print Ticket</span>
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Share2 className="h-4 w-4" />
                                <span>Share</span>
                            </Button> */}
                        </div>
                    </div>
                </div>

                <div className="mt-8 space-y-4 text-center">
                    <p className="text-muted-foreground">
                        If you have any questions, please contact us at{' '}
                        <a href="mailto:support@herdayforher.com" className="text-alpha underline">
                            support@herdayforher.com
                        </a>
                    </p>
                    <div>
                        <Link href="/">
                            <Button variant="link" className="text-alpha">
                                Return to Homepage
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
