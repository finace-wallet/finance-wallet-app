import React from "react";
import Layout from "../../components/layout/main/Layout";
import LayoutAuthentication from "../../layout/LayoutAuthentication";
import UserSettingLayout from "../../components/layout/user-setting/UserSettingLayout";
import LayoutTwoColumn from "../../layout/LayoutTwoColumn";

const UserSetting = () => {
  return (
    <>
      <Layout>
        <UserSettingLayout>
          <LayoutTwoColumn>
            {{
              left: (
                <>
                  <p>This is the content for left panel</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quia, tenetur eaque perferendis excepturi, exercitationem
                    ipsum dolor iusto deleniti repellat earum quibusdam laborum
                    hic in aut nobis facilis distinctio unde repudiandae!
                  </p>
                </>
              ),
              right: (
                <>
                  <p>This is the content for right panel</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aperiam amet, neque atque unde, autem veniam voluptate
                    tempore ipsam doloremque quis ratione, vitae molestias eos
                    perferendis nisi sed dicta quia? Ipsa!
                  </p>
                </>
              ),
            }}
          </LayoutTwoColumn>
        </UserSettingLayout>
      </Layout>
    </>
  );
};

export default UserSetting;
