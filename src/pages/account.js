import { Avatar, Card } from "@mui/material";
import AccountDetails from "src/components/account/account-details";

const { DashboardLayout } = require("src/components/dashboard-layout");

const Account = () => {
    return (
        <>
            <AccountDetails />
        </>
    );
}
Account.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
export default Account;