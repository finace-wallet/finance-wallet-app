import UserSettingLayout from "layout/user-setting/UserSettingLayout";
import React, { useEffect } from "react";
import LayoutTwoColumn from "layout/LayoutTwoColumn";
import Layout from "layout/main/Layout";
import CardProfile from "components/card/CardProfile";
import CardComponent from "components/card/CardComponent";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "api/AuthApi";
import { setUser } from "store/auth/authSlice";

const Account = () => {
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, [token]); // Refetch data if token changes

  const fetchData = async () => {
    try {
      console.log("Token:", token);
      const response = await getUserData(token);
      const userData = response.data.data;
      // console.log("Response from backend:", userData);
      dispatch(setUser(userData));

      // Do something with userData
    } catch (error) {
      // Handle error
      console.error("Error fetching user data:", error);
    }
  };

  const userDetails = useSelector((state) => state.auth.userDetails);

  // console.log("current user", userDetails);
  return (
    <>
      <Layout>
        <UserSettingLayout>
          <LayoutTwoColumn leftStyle="my-auto mt-10">
            {{
              left: (
                <>
                  <CardProfile user={userDetails}></CardProfile>
                </>
              ),
              right: (
                <>
                  <CardComponent heading="Phone" type="phone">
                    {{
                      title: "Contact",
                      content:
                        userDetails && userDetails.phoneNumber
                          ? userDetails.phoneNumber
                          : "N/A",
                      notification: "This is your main phone number",
                    }}
                  </CardComponent>
                  <CardComponent heading="Address" type="house">
                    {{
                      title: "Location",
                      content:
                        userDetails && userDetails.address
                          ? userDetails.address
                          : "N/A",
                      notification: "This is your main address",
                    }}
                  </CardComponent>
                </>
              ),
            }}
          </LayoutTwoColumn>
        </UserSettingLayout>
      </Layout>
    </>
  );
};

export default Account;
