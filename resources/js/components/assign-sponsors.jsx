    import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge, Plus, X } from 'lucide-react';
import { useState } from 'react';

const AssignSponsors = ({ sponsors, selectedSponsors, setSelectedSponsors }) => {
    console.log("from the component:", selectedSponsors);
    const [newSponsors, setNewSponsors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const handleAddSponsor = (sponsor) => {
        if (!selectedSponsors.some((s) => s.id === sponsor.id)) {
            const tempSponsors = [...selectedSponsors, sponsor]
            console.log(...tempSponsors);
            setSelectedSponsors([...tempSponsors]);
        }
    };

    const handleRemoveSponsor = (sponsorId) => {
        const updatedSponsors = selectedSponsors.filter((s) => s.id !== sponsorId);
    
        setSelectedSponsors(updatedSponsors);
        setData((prev) => ({
            ...prev,
            selectedSponsors: updatedSponsors.map((s) => s.id),
        }));
    };
    

    const handleRemoveNewSponsor = (index) => {
        setNewSponsors((prev) => prev.filter((_, i) => i !== index));
    };

    const filteredSponsors = sponsors?.filter((sponsor) => sponsor.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return (
        <div>
            <Card className="p-6">
                <div className="space-y-6">
                    <div className="flex flex-col justify-between gap-4 md:flex-row">
                        <h3 className="text-lg font-semibold">Assign Sponsors</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Select Existing Sponsors</Label>
                                <div className="relative">
                                    <Input
                                        placeholder="Search sponsors..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="mb-2"
                                    />
                                </div>
                                <div className="h-[300px] overflow-y-auto rounded-md border p-2">
                                    {filteredSponsors.length > 0 ? (
                                        (filteredSponsors || []).map((sponsor) => (
                                            <div
                                                key={sponsor.id}
                                                className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-gray-50"
                                                onClick={() => handleAddSponsor(sponsor)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                                                        <img src={`/storage/${sponsor.images[0].path}`} alt={sponsor.name} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">{sponsor.name}</p>
                                                        {/* <div className="mt-1">{getTierBadge(sponsor.tier)}</div> */}
                                                    </div>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAddSponsor(sponsor);
                                                    }}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="py-4 text-center text-gray-500">No sponsors found</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Selected Sponsors</Label>
                                <div className="h-[300px] overflow-y-auto rounded-md border p-2">
                                    {selectedSponsors.length > 0 || newSponsors.length > 0 ? (
                                        <div className="space-y-4">
                                            {selectedSponsors.map((sponsor) => (
                                                <div key={sponsor.id} className="relative rounded-md border p-3">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                                                        onClick={() => handleRemoveSponsor(sponsor.id)}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                                                            <img src={`/storage/${sponsor?.images[0]?.path}`} alt={sponsor?.name} />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">{sponsor?.name}</p>
                                                            {/* {getTierBadge(sponsor.tier)} */}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            {newSponsors.map((sponsor, index) => (
                                                <div key={`new-${index}`} className="relative rounded-md border bg-green-50 p-3">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                                                        onClick={() => handleRemoveNewSponsor(index)}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-md bg-white">
                                                            {sponsor.logo ? (
                                                                <span className="text-xs text-gray-500">Logo uploaded</span>
                                                            ) : (
                                                                <span className="text-xs text-gray-500">No logo</span>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">{sponsor.name}</p>
                                                            <Badge className="mt-1 bg-green-100 text-green-800">New Sponsor</Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex h-full flex-col items-center justify-center">
                                            <p className="mb-2 text-gray-500">No sponsors selected</p>
                                            <p className="text-xs text-gray-400">Select sponsors from the list or create new ones</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default AssignSponsors;
