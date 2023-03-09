import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const HomeIcon = ({ color }) => {
  return <Ionicons {...color} size={20} name="home-outline" />;
};

const PayslipIcon = ({ color }) => {
  return <Ionicons {...color} size={20} name="document-text-outline" />;
};

const ContactIcon = ({ color }) => {
  return <AntDesign {...color} size={20} name="contacts" />;
};

const SettingIcon = ({ color }) => {
  return <AntDesign {...color} size={20} name="setting" />;
};

export { HomeIcon, PayslipIcon, ContactIcon, SettingIcon };
