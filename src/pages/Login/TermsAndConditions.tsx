import React from "react";
import Box from "@mui/material/Box";
import { AppBar, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import GavelIcon from "@mui/icons-material/Gavel";
function TermsAndConditions() {
  const email = "fitpowerupapp";
  const atAddress = "@gmail.com";
  const completeEmail = email + atAddress;
  return (
    <Container
      maxWidth="md"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar
        elevation={3}
        position="fixed"
        style={{
          top: 0,
          height: "56px",
          background:
            "radial-gradient(circle, rgba(80,80,80,1) 0%, rgba(0,0,0,1) 100%)",
        }}
      >
        <Container maxWidth="md">
          <Toolbar disableGutters>
            <GavelIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="text"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },

                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              User Agreement
            </Typography>

            <GavelIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

            <Typography
              variant="h5"
              noWrap
              component="text"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,

                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              User Agreement
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: "56px", // Add
        }}
        className="secondary-font"
        fontFamily="Arial"
        fontSize="1rem"
      >
        <Typography variant="h6">Terms and Conditions</Typography>
        
        <span>
          Welcome to <strong>fitPowerUp</strong>!
        </span>
        <br></br>
        <span>
          <strong>Introduction</strong>
        </span>
        These terms and conditions ("Terms") govern your access to and use of
        the fitPowerUp fitness application ("App") provided by Daniel Matei
        ("Independent Developer," "I," or "me").
        <br></br>By using the App, you agree to be bound by these Terms. If you
        do not agree to these Terms, please refrain from using the App.
        <br></br>
        <br></br>
        <strong>Description of the App</strong> fitPowerUp is a fitness
        application that offers various features and services to help you track
        your workouts, access exercise routines, in-depth data analysis
        functionalities and connect with a community of fitness enthusiasts. The
        App uses the PWA technology, and is available for installation on
        compatible mobile devices.
        <br></br>
        <br></br>
        <strong>Eligibility</strong> a. You must be at least 13 years of age to
        use the App. If you are under the age of 18, you must have the consent
        of a parent or legal guardian to use the App. <br></br>b. By using the
        App, you represent and warrant that you have the legal capacity to enter
        into these Terms and comply with all applicable laws.
        <br></br>
        <br></br>
        <strong>User Account</strong> a. In order to use certain features of the
        App, you do need to create a user account. When creating your account,
        you are advised to provide accurate and complete information. Pseudonyms
        are acceptable, provided they are not offensive, misleading, or violate
        any intellectual property rights.<br></br>b. You are responsible for
        maintaining the confidentiality of your account credentials and are
        solely responsible for all activities that occur under your account.{" "}
        <br></br>c. You agree to notify me immediately of any unauthorized use
        of your account or any other breach of security. <br></br>d. I reserve
        the right to suspend or terminate your account at any time, at my sole
        discretion, for any reason or no reason, without prior notice.
        <br></br>
        <br></br>
        <strong>Free Use and Limitations on Online functionalities</strong>
        a. fitPowerUp is available for free use, allowing users to access and
        utilize its features and services at no cost.
        <br></br>
        b. However, please note that certain limitations may be imposed on the
        online functionalities of the app, including but not limited to:
        <br></br>
        <em>i. Availability and Accessibility:</em>
        While I strive to provide continuous and uninterrupted access to the
        social component, there may be occasions when access is temporarily
        suspended or restricted due to maintenance, updates, or unforeseen
        circumstances. I will make reasonable efforts to minimize any
        disruptions and notify users in advance whenever possible.
        <br></br>
        <em>ii. Service and Feature Modifications:</em>I reserve the right to
        modify, suspend, or discontinue any aspect of the online
        functionalities, including services, features, or functionalities, at
        any time and without prior notice. This may include the addition or
        removal of certain features or the introduction of new ones. Any
        modifications or discontinuations will not affect the free use of the
        app's core features.
        <br></br>
        c. I will make reasonable efforts to inform users about any limitations
        or changes to the social component that may affect their usage
        experience. However, it is the user's responsibility to review and stay
        updated with the app's announcements, notifications, and terms of use to
        understand any limitations or changes that may apply.
        <br></br>
        d. The free use of the app's core features, as described in these Terms
        and Conditions, will not be adversely affected by any limitations placed
        on the social component, unless explicitly stated.
        <br></br>
        <br></br>
        <strong>User Content</strong> a. By using the App, you may have the
        opportunity to upload, submit, or post content, including but not
        limited to text and photos ("User Content"). <br></br>b. You retain
        ownership of your User Content, but by submitting it to the App, you
        grant me a non-exclusive, royalty-free, worldwide, sublicensable, and
        transferable license to use, reproduce, modify, adapt, publish,
        translate, distribute, publicly display and perform your User Content in
        connection with the operation and promotion of the App. <br></br>c. You
        are solely responsible for your User Content and any consequences
        resulting from its submission, including any reliance by others on its
        accuracy or legality. <br></br>d. You must not upload, submit, or post
        User Content that is unlawful, harmful, defamatory, infringing, abusive,
        obscene, or otherwise objectionable.
        <br></br>
        <br></br>
        <strong>Privacy Policy</strong> a. I am committed to protecting your
        privacy. My collection, use, and disclosure of personal information are
        governed by my Privacy Policy categories below. <br></br>b. By using the
        App, you consent to the collection, use, and disclosure of your personal
        information as described in the Privacy Policy categories below.
        <br></br>
        <br></br>
        <strong>Privacy Policy on Collected Information</strong>
        <em>a. Account Registration:</em>
        When creating a user account on fitPowerUp, we collect the following
        information: name, surname and email address.
        <br></br>This information is necessary to create and manage your user
        account. Various features inside the app may require you to add your
        weight or sex, but the decision to use those features is completely
        optional.
        <br></br>
        <br></br>
        <strong>Privacy Policy on Use of Information</strong>
        <em>a. Account Management:</em>
        The information collected during account registration is used for the
        purpose of managing and administering your fitPowerUp user account.
        <em>b. Communication: </em>There will be no use of your email address to
        send you any notifications, updates, and information related to the App
        or your account.
        <br></br>
        <br></br>
        <strong>Data Storage and Security</strong>
        <em>a. Data Storage:</em> The user information collected during account
        registration is securely stored using various services within the Google
        Cloud Infrastructure.
        <em>b. Data Security:</em> We implement appropriate security measures to
        protect your personal information from unauthorized access, alteration,
        disclosure, or destruction. However, please note that no data
        transmission or storage can be guaranteed to be 100% secure. Therefore,
        while we strive to protect your data, we cannot guarantee its absolute
        security.
        <br></br>
        <br></br>
        <strong>Cookies and Tracking Technologies</strong>
        fitPowerUp does not use cookies or employ any tracking technologies to
        collect information about your use of the App.
        <br></br>
        <br></br>
        <strong>Third-Party Services</strong> a. We do not share your personal
        information with any third parties, except as necessary to provide the
        App's core functionality, support our operations, or as required by law.
        <br></br>
        <br></br>
        <strong>Data Retention</strong>
        a. We will retain your personal information for as long as necessary to
        fulfill the purposes outlined in this Privacy Policy, unless a longer
        retention period is required or permitted by law.
        <br></br>
        <br></br>
        <strong>User Rights and Choices</strong>
        <em>a. Access and Correction:</em> You may access and update your
        personal information stored in your fitPowerUp user account by logging
        into the App and editing your profile.
        <em>b. Account Deletion: </em>You may request the deletion of your
        fitPowerUp user account and associated personal information by
        contacting us using the information referenced multiple times inside the
        document.
        <br></br>
        <br></br>
        <strong>Children's Privacy</strong> a. The fitPowerUp App is not
        intended for use by individuals under the age of 13. We
        <br></br> do not knowingly collect personal information from children
        under 13. If you are a parent or guardian and believe we may have
        collected information about a child, please contact us using the
        information provided in Section 9.
        <br></br>
        <br></br>
        <strong>Contact Me</strong>
        a. If you have any questions, concerns, or requests related to this
        Privacy Policy or the handling of your personal information, please
        contact me at:
        <br></br>
        <strong>{completeEmail}</strong>
        <br></br>
        <br></br>
        <strong>Changes to this Privacy Policy</strong>
        a. I reserve the right to update or modify this Privacy Policy at any
        time. Any changes will be effective immediately upon posting the revised
        Privacy Policy within the App. Your continued use of the App after the
        posting of any modifications constitutes your acceptance of the updated
        Privacy Policy. Please read this Privacy Policy carefully and
        periodically review it for any updates or changes.
        <br></br>
        <br></br>
        <strong>Disclaimers and Limitation of Liability</strong> a. The App is
        provided on an "as is" and "as available" basis, without warranties of
        any kind, express or implied, including, but not limited to, warranties
        of merchantability, fitness for a particular purpose, and
        non-infringement.
        <br></br>
        b. I do not warrant that the App will be uninterrupted, error-free, or
        secure, or that any defects or errors will be corrected.
        <br></br>c. In no event shall I be liable for any indirect, incidental,
        special, consequential, or punitive damages, including without
        limitation, loss of profits, data, use, goodwill, or other intangible
        losses, arising out of or in connection with your use of the App.
        <br></br>
        <br></br>
        <strong>Modification and Termination</strong> a. I reserve the right to
        modify or discontinue the App at any time, with or without notice.
        <br></br>b. I may also revise these Terms from time to time. The updated
        Terms will be effective as of the date of their posting.
        <br></br>c. Your continued use of the App after the posting of the
        updated Terms constitutes your acceptance of the revised Terms.
        <br></br>
        <br></br>
        <strong>Governing Law and Dispute Resolution</strong> a. These Terms
        shall be governed by and construed in accordance with the laws of Spain.{" "}
        <br></br>b. Any disputes arising out of or in connection with these
        Terms shall be resolved exclusively through arbitration, in accordance
        with the rules of Spanish Court of Arbitration (Tribunal Arbitral de
        España or Corte Española de Arbitraje).
        <br></br>
        <br></br>
        <strong>Disclaimer of Commercial Exchange and Service Provision</strong>
        Please be aware that this app is not engaged in any form of commercial
        exchange and does not offer services for sale or trade. All rights
        related to the content, characters, and trademarks are owned by Toei
        Animation, FUNimation, Fuji TV, and Akira Toriyama. This app is created
        as a non-commercial, fan-made project and does not claim any affiliation
        with, endorsement by, or rights over the intellectual property owned by
        the aforementioned entities. Any use of this app is for personal,
        non-commercial purposes only.
        <br></br>
        <br></br>
        <strong>
          Statement Regarding Dragon Ball Z-Inspired Elements and Copyright
          Ownership
        </strong>
        fitPowerUp would like to acknowledge that certain elements within the
        app are inspired by the iconic anime series Dragon Ball Z. However, it
        is important to note that all copyrights and intellectual property
        rights related to Dragon Ball Z and its associated assets belong
        exclusively to Toei Animation, FUNimation, Fuji TV and Akira Toriyama.
        <br></br>
        <br></br>
        fitPowerUp does not claim ownership of any Dragon Ball Z related assets,
        including but not limited to characters, images, logos, or other
        copyrighted material.
        <br></br>
        <br></br>
        Any visual or thematic resemblances to Dragon Ball Z are purely for the
        purpose of inspiration and fan appreciation.
        <br></br>
        <br></br>I respect the intellectual property rights of Toei Animation
        and their associated rights holders.
        <br></br>
        <br></br>I have not entered into any licensing agreements or
        partnerships with Toei Animation, and the use of Dragon Ball Z-inspired
        elements within fitPowerUp does not imply any endorsement or official
        affiliation with the Dragon Ball Z brand or its creators.
        <br></br>
        <br></br>
        If you are a copyright holder or representative of Toei Animation and
        believe that fitPowerUp or its users have infringed upon your
        intellectual property rights, please contact me immediately.
        <br></br>
        <br></br>I am committed to promptly addressing and resolving any
        legitimate concerns regarding copyright infringement.
        <br></br>
        <br></br>
        fitPowerUp encourages its users to respect all intellectual property
        rights and abide by applicable copyright laws.
        <br></br>
        <br></br>
        Users are prohibited from reproducing, distributing, or utilizing any
        copyrighted material from Dragon Ball Z or any other copyrighted sources
        within the app, unless explicitly authorized by the respective copyright
        holders.
        <br></br>
        <br></br>
        By using fitPowerUp, users agree to comply with all copyright laws and
        understand that any infringement of intellectual property rights may
        result in the termination of their access to the app and potential legal
        consequences.
        <br></br>
        <br></br>
        <strong>Miscellaneous</strong> a. These Terms constitute the entire
        agreement between you and the Independent Developer regarding the App
        and supersede any prior agreements or understandings. <br></br>b. If any
        provision of these Terms is found to be unenforceable, the remaining
        provisions shall continue in full force and effect. <br></br>c. My
        failure to enforce any right or provision of these Terms shall not be
        deemed a waiver of such right or provision.
        <br></br>
        <br></br>
        If you have any questions or concerns about these Terms, please contact
        me at: <br></br>
        <strong>{completeEmail}</strong>
        <br></br>Thank you for using fitPowerUp!
      </Box>
    </Container>
  );
}

export default TermsAndConditions;
