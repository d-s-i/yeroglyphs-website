import React from "react";
import Link from "next/link";
import UnstyledButtonCustom from "../Buttons/MySVGButton";

interface Props {
    isReadyForProd: boolean
}

function ButtonLinks(props: Props) {
    if(props.isReadyForProd) {
        return(
            <React.Fragment>
                <Link href="/mint" passHref>
                    <a href="/mint">
                        <UnstyledButtonCustom>Mint</UnstyledButtonCustom>
                    </a>
                </Link>
                <Link href="/view" passHref>
                    <a href="/view">
                        <UnstyledButtonCustom>View</UnstyledButtonCustom>
                    </a>
                </Link>
                <Link href="/generate" passHref>
                    <a href="/generate">
                        <UnstyledButtonCustom>Generate</UnstyledButtonCustom>
                    </a>
                </Link>
                <Link href="/save" passHref>
                    <a href="/save">
                        <UnstyledButtonCustom>Save</UnstyledButtonCustom>
                    </a>
                </Link>
            </React.Fragment>
        );
    } else {
        return(
            <React.Fragment>
            <UnstyledButtonCustom>Comming Soon ...</UnstyledButtonCustom>
            <UnstyledButtonCustom>Comming Soon ...</UnstyledButtonCustom>
            <UnstyledButtonCustom>Comming Soon ...</UnstyledButtonCustom>
            <UnstyledButtonCustom>Comming Soon ...</UnstyledButtonCustom>
        </React.Fragment>
        );
    }
}

export default ButtonLinks;