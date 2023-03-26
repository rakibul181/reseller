import { useEffect, useState } from "react";

const useSeller = (email) => {
    const [isSeller, setIsSeller] = useState(false);
    const [isLoadingSeller, setIsLoadingSeller] = useState(true);

    useEffect(() => {
        if (email) {
            fetch(`https://pushpali-server-iesratadhara.vercel.app/users/seller/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIsSeller(data.isSeller)
                    setIsLoadingSeller(false)
                })
        }

    }, [email])
    return [isSeller, isLoadingSeller]
}
export default useSeller