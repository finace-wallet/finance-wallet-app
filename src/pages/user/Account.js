import React from "react";
import Layout from "../../components/layout/main/Layout";
import UserSettingLayout from "../../components/layout/user-setting/UserSettingLayout";
import LayoutTwoColumn from "../../layout/LayoutTwoColumn";
import CardProfile from "../../components/card/CardProfile";
import CardComponent from "../../components/card/CardComponent";

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
