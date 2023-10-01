import {
  Box,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import GeneralSetting from "../../components/Moderator/GeneralSetting";
import PasswordChange from "../../components/Moderator/PasswordChange";

export default function Settings() {
  return (
    <div>
      <Box p={10}>
        <Tabs>
          <TabList>
            <Tab>General Setting</Tab>
            <Tab>Change Password</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <GeneralSetting />
            </TabPanel>
            <TabPanel>
              <PasswordChange />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
}
