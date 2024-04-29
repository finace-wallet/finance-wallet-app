import UserSettingLayout from "layout/user-setting/UserSettingLayout";
import React from "react";
import LayoutTwoColumn from "layout/LayoutTwoColumn";
import Layout from "layout/main/Layout";
import CardProfile from "components/card/CardProfile";
import CardComponent from "components/card/CardComponent";

const Account = () => {
  const user = [
    {
      name: "huy",
    },
  ];
  return (
    <>
      <Layout>
        <UserSettingLayout>
          <LayoutTwoColumn leftStyle="my-auto mt-10">
            {{
              left: (
                <>
                  <CardProfile user={user}></CardProfile>
                </>
              ),
              right: (
                <>
                  <CardComponent heading="Phone" type="phone">
                    {{
                      title: "Contact",
                      content: "123-456-7890",
                      notification: "This is your main phone number",
                    }}
                  </CardComponent>
                  <CardComponent heading="Address" type="house">
                    {{
                      title: "Location",
                      content: "1234 Street, City, Country",
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
