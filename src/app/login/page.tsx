

import SignIn from "@/components/supaauth/login";
import { Box } from "@radix-ui/themes";

const AuthLoginPage = () => {
    return (
        <div className="flex align-center justify-center min-h-[100vh]">
            <Box className="m-auto p-4">
                <SignIn />
            </Box>
        </div>
    )
}

export default AuthLoginPage
