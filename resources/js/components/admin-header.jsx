import { Button } from "@/components/ui/button"

const AdminHeader = ({ title, description, action }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between my-3 pb-4 border-b">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
            </div>
            {action && (
                <div className="mt-4 md:mt-0">
                    <Button onClick={action.onClick} className="bg-[#03329b] hover:bg-[#03329b]/90 cursor-pointer">
                        {action.icon && <span className="mr-2">{action.icon}</span>}
                        {action.label}
                    </Button>
                </div>
            )}
        </div>
    )
}

export default AdminHeader;
