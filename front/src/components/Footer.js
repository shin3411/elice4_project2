import React from "react";
import Typography from "@mui/material/Typography";
import { FooterContainer } from "styles/Components/ComponentStyle";

function Footer() {
  return (
    <FooterContainer>
      <Typography variant="body2" color="text.secondary" align="center">
        Copyright © 문해한 하루 &nbsp;
        {new Date().getFullYear()}.
      </Typography>
    </FooterContainer>
  );
}

export default Footer;
