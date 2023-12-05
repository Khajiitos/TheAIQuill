'use client'
import Image from "next/image";
import Script from "next/script";
import { MouseEventHandler, useState } from "react";

export default function LikeButton(props: {liked: boolean}) {
    const [liked, setLiked] = useState<boolean>(true);

    function onClick(e: MouseEvent) {
        fetch('/api/like', {
            method: liked ? 'DELETE' : 'PUT'
        });

        setLiked(!liked);
    }

    return (
        <Image className="cursor-pointer" title={liked ? "Click to remove like" : "Click to add like"} src={liked ? "/img/like_full_liked.svg" : "/img/like_full.svg"} alt="Like" width={128} height={128} onClick={onClick}></Image>
    )
}