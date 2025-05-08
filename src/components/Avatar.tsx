import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useEffect, useState } from "react"

export default function AvatarDemo() {
    const [parsedUsername, setParsedUsername] = useState<{ username: string } | null>(null);

    useEffect(() => {
        const username = sessionStorage.getItem("user");
        if (username) {
            try {
                setParsedUsername(JSON.parse(username));
            } catch (e) {
                console.error("Invalid sessionStorage value for 'user'", e);
            }
        }
    }, []);

    const fallbackAvatarUrl = "./info.png";
    const fallbackLetters = parsedUsername?.username.slice(0, 2).toUpperCase() || "UP";

    const avatarUrl = parsedUsername
        ? `https://raw.githubusercontent.com/StageUNIPD/data/main/avatars/${parsedUsername.username.replace(" ", "").toLowerCase()}.png`
        : fallbackAvatarUrl;

    return (
        <Avatar>
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{fallbackLetters}</AvatarFallback>
        </Avatar>
    );
}
