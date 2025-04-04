import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className=" text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-bold bg-gradient-to-r from-alpha/90 to-beta text-transparent bg-clip-text text-lg ">
                    Her Day 4 Her
                </span>
                            </div>
        </>
    );
}
