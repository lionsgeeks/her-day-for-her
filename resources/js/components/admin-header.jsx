import { Button } from '@/components/ui/button';

const AdminHeader = ({ title, description, action }) => {
    return (
        <div className="md:items- border- my-3 flex justify-between pb-4">
            <div>
                <h1 className="text-2xl font-extrabold text-gray-900">{title}</h1>
                {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
            </div>
            {action && (
                <div>
                    <Button onClick={action.onClick} className="cursor-pointer bg-[#03329b] hover:bg-[#03329b]/90">
                        {action.icon && <span>{action.icon}</span>}
                        <span className="hidden md:inline">{action.label}</span>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AdminHeader;
