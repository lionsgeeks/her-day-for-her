import { SVGAttributes } from 'react';
import Logo from "../../../public/logo.svg"

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <img className='w-10' src={Logo} alt="" />
    );
}
