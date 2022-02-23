import { styled } from "../stitches.config";
import { Link as LinkIconP } from "phosphor-react";

import Box from "../components/Box";
import Text from "../components/Text";
import Paragraph from "../components/Paragraph";
import Link from "../components/Link";

import ThemeHeading from "../components/Heading";
import Container from "../components/Container";

import Stack from "../components/Stack";

const Heading = styled(ThemeHeading, {
  fontFamily: "$body",
  textTransform: "none",
  my: "$6",
  lineHeight: "$body",
  fontSize: "$2xl",
});

const LinkIcon = styled(LinkIconP, {
  color: "$text",
});

const ThemeLink = styled(Link, {
  color: "$link",
});

const ListItem = styled("li", {
  lineHeight: "1.42",
  my: "$5",
});

const PrivacyPolicy = () => {
  return (
    <Container
      css={{
        maxWidth: "$4xl",
      }}
    >
      <Box
        css={{
          borderBottom: "1px solid $muted",
          pb: "$8",
        }}
      >
        <ThemeHeading
          as="h1"
          css={{
            boxSizing: "border-box",
            pt: "$16",
            pb: "$8",
            my: 0,
            "@initial": {
              fontSize: "$3xl",
            },
            "@sm": {
              fontSize: "$4xl",
            },
            "@md": {
              fontSize: "$6xl",
            },
            "@lg": {
              fontSize: "$7xl",
            },
          }}
        >
          Terms of Use
        </ThemeHeading>
        <Text
          css={{
            fontSize: "$2xl",
            lineHeight: "1.2",
          }}
        >
          Vanilla terms of service.
        </Text>
      </Box>
      <Stack
        css={{
          mb: "$5",
          display: "block",
          width: "100%",
          [`> ${Box}`]: {
            borderBottom: "1px solid $muted",
            pb: "$9",
            "&:last-child": {
              borderBottom: 0,
            },
          },
        }}
      >
        <Box>
          <Heading as="h2" id="1-introduction">
            <ThemeLink href="#1-introduction">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            1. Introduction
          </Heading>
          <Paragraph>
            Welcome to{" "}
            <Link as="a" href="/">
              https://vanilladefi.com
            </Link>
            &nbsp;(&ldquo;Site&rdquo;), a website-hosted user interface provided
            and operated by Equilibrium Group Oy (&ldquo;we&rdquo;,
            &ldquo;us&rdquo;, &ldquo;our&rdquo;).
          </Paragraph>
          <Paragraph>
            Equilibrium Group Oy (business ID 2891403-1) is a limited liability
            company formed under Finnish law, which has its principal office at
            Linnankatu 3 A 24, 20100 Turku, Finland. We are a research and
            development company focused on designing and building the
            decentralized web.
          </Paragraph>
          <Paragraph>
            Our Site gives you access to decentralized asset manager platform on
            the Polygon &amp; Ethereum blockchains that allows users to make a
            profit by staking ERC-20 assets using smart contracts.
          </Paragraph>
          <Paragraph>
            Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully
            before using the Site, as they govern your use of the Site, and the
            products, features, content, applications or services we provide
            through the Site (collectively with the Site, the
            &ldquo;Services&rdquo;) as well as your rights and obligations. Our
            privacy policy can be found here [URL].
          </Paragraph>
          <Paragraph>
            By accessing or using our Services, you accept and agree to be bound
            by and to comply with these Terms. If you do not agree, you are not
            authorized to access or use our Services.
          </Paragraph>
          <Paragraph>
            If you have any queries in relation to our Services, or these Terms,
            please contact us by email:{" "}
            <a href="mailto:hello@vanilladefi.com">hello@vanilladefi.com</a>.
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h3" id="2-eligibility">
            <ThemeLink href="#2-eligibility">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            2. Eligibility
          </Heading>
          <Paragraph>
            You represent and warrant that you have the full right, power, and
            authority to enter into and comply with these Terms on behalf of
            yourself and any company or legal entity for which you may access or
            use the Services. You further represent and warrant that your access
            and use of the Services will fully comply with all applicable laws
            and regulations, and that you will not access or use the Services to
            conduct, promote, or otherwise facilitate any illegal activity.
          </Paragraph>
          <Paragraph>
            We may, in our sole discretion, refuse to offer the Services to any
            person or entity and change the eligibility criteria for use thereof
            at any time.
          </Paragraph>
        </Box>

        <Box>
          <Heading as="h2" id="3-use-of-the-services">
            <ThemeLink href="#3-use-of-the-services">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            3. Your Use of the Services
          </Heading>
          <Paragraph>
            We grant to you a limited, personal, non-transferable,
            non-sublicensable, revocable license to access and use the Site for
            purposes of using the Services (and only while you are actively
            using the Services). Use, reproduction, modification, distribution,
            or storage of any content for other than purposes of using the
            Services is expressly prohibited without prior written permission
            from us. You shall not sell, license, rent, or otherwise use or
            exploit any content for commercial use or in any way that violates
            the rights of any third party or these Terms.
          </Paragraph>
          <Paragraph>
            The Services are provided on an &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; basis only. We give no warranties that the Services
            will always be available, uninterrupted or secure, or that the
            information contained on the Site will be accurate, complete or
            current, or that the Services will be free from errors, defects,
            viruses, or other harmful elements. From time to time, access may be
            interrupted, suspended, or restricted because of a fault, error or
            unforeseen circumstances or because we are carrying out planned
            maintenance.
          </Paragraph>
          <Paragraph>
            Some of the content on the Site may be out of date at any given time
            and we are under no obligation to update it. We will not be liable
            to you for any loss or damage you may suffer as a result of the
            Services being unavailable at any time for any reason. You will
            comply with all applicable domestic and international laws,
            statutes, ordinances, and regulations applicable to your use of the
            Services.
          </Paragraph>
          <Paragraph>
            You acknowledge and agree that your use of the Site and Services is
            at your own risk.{" "}
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h3" id="4-prohibited-activity">
            <ThemeLink href="#4-prohibited-activity">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            4. Prohibited Activity
          </Heading>
          <Paragraph>
            You agree to access and use the Services only for their intended
            purpose. You agree not to perform, or attempt to perform, any of the
            following prohibited activities in relation to your access and use
            of the Services:
          </Paragraph>
          <ul>
            <ListItem>
              Violation of any intellectual property rights by infringing any
              copyright, trademark, service mark, patent, right of publicity,
              right of privacy, or other proprietary or intellectual property
              rights under the law.
            </ListItem>
            <ListItem>
              Interference with or compromising the integrity, security, or
              proper functioning of any computer, server, network or personal
              device, including the deployment of viruses and denial of service
              attacks.
            </ListItem>
            <ListItem>
              Usage of the Site to simulate misleading communications from us or
              another service or entity in order to collect identity
              information, authentication credentials, or other information
              (known as &lsquo;phishing&rsquo;).
            </ListItem>
            <ListItem>
              Disguising or interfering in any way with the IP address of the
              computer you are using to access the Site or otherwise take steps
              to prevent us from correctly identifying the actual IP address of
              the computer you are using whilst accessing the Site.
            </ListItem>
            <ListItem>
              Any other unlawful behaviour that violates any applicable law,
              rule, regulation, or another relevant jurisdiction.
            </ListItem>
            <ListItem>
              Usage of the Site in any manner that disrupts its operation.
            </ListItem>
          </ul>
          <Paragraph>
            We reserve the right to limit the availability of the Services to
            any person, geographic area or jurisdiction we so desire and/or to
            terminate your access and use of the Services, at any time and at
            our sole discretion. We may suspend or disable your access to the
            Services if we consider it reasonable to do so, e.g., in situations
            of non-compliance with these Terms.
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h4" id="5-intellectual-property-rights">
            <ThemeLink href="#5-intellectual-property-rights">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            5. Intellectual Property Rights
          </Heading>
          <Paragraph>
            We own all intellectual property and other rights in the Site and
            the contents and material published on it. These works are protected
            by copyright laws and all such rights are reserved. These Terms do
            not transfer any of our or third-party&rsquo;s intellectual
            property, to you.
          </Paragraph>
          <Paragraph>
            <Link as="a" href="/">
              https://vanilladefi.com
            </Link>
            &nbsp;is the uniform resource locator (&lsquo;URL&rsquo;) of the
            Site. You will not make use of this URL (or any other URL owned by
            us) on another website or digital platform without our prior written
            consent.
          </Paragraph>
          <Paragraph>
            You agree not to monitor, use or copy our Site, unless expressly
            authorized by us. Any unauthorised use or reproduction may be
            prosecuted.
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h2" id="6-changes-to-these-terms">
            <ThemeLink href="#6-changes-to-these-terms">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            6. Changes to these terms
          </Heading>
          <Paragraph>
            We reserve the exclusive right to unilaterally change these Terms
            from time to time in our sole discretion. You are advised to check
            these Terms periodically to assure that you are aware and comply
            with the latest version of these Terms. In case of the modifications
            of the Terms, we will indicate that on the Site and communicate it
            to you by updating the date on top of these Terms.
          </Paragraph>
          <Paragraph>
            Changes are binding on users of the Site and will be effective after
            they are posted on the Site, unless stated otherwise in our notice.
            You acknowledge and agree that you accept these Terms (and any
            amendments hereto) each time you access the Site or utilize the
            Services in any manner. Therefore, we encourage you to review these
            Terms regularly as you shall be bound by them.
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h2" id="7-what-data-protection-rights">
            <ThemeLink href="#7-what-data-protection-rights">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            7. Privacy and Cookies
          </Heading>
          <Paragraph>
            Your use of the Services is subject to our{" "}
            <Link as="a" href="/privacy-policy">
              Privacy Policy
            </Link>
            , which is incorporated herein by reference.
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h3" id="8-disclaimers">
            <ThemeLink href="#8-disclaimers">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            8. Disclaimers
          </Heading>
          <Paragraph>
            Our Site&rsquo;s main function is to act as an interface and
            facilitator for decentralized token staking on the Ethereum &amp;
            Polygon blockchains. You acknowledge that our Services merely
            provide you a user interface by which you may access decentralized
            activities.
          </Paragraph>
          <Paragraph>
            By accessing and using the Services, you further represent that you
            understand the inherent risks associated with using cryptographic
            and blockchain-based systems. You understand that the markets for
            these digital assets are highly volatile due to factors including
            (but not limited to) adoption, speculation, technology, security,
            and regulation. You acknowledge that the cost and speed of
            transacting with cryptographic and blockchain-based systems such as
            Ethereum are variable and may increase dramatically at any time. We
            are not responsible for any of these variables or risks. You
            expressly waive and release us from any and all liability, claims,
            causes of action, or damages arising from or in any way related to
            your use of the Services. You acknowledge that any interactions
            through the Site is entirely your own responsibility and liability.
          </Paragraph>
          <Paragraph>
            We do not guarantee that the Site will be secure or free from bugs
            or viruses.
          </Paragraph>
          <Paragraph>
            You are responsible for configuring the technology in your use,
            computer programs, and platform in order to access the Site. You
            should use your own virus protection software.
          </Paragraph>
          <Paragraph>
            We cannot promise that the use of the Site, or any content taken
            from the Site, will not infringe the rights of any third party. We
            do not endorse, guarantee, or assume responsibility for any
            advertisements, offers, or statements made by third parties
            concerning the Site.
          </Paragraph>
          <Paragraph>
            The content and materials available on the Site do not constitute
            any form of financial advice or recommendation by us, should not be
            regarded as an offer, solicitation, invitation, or recommendation to
            buy or sell investments, securities or any other financial services
            and is not intended to be relied upon by you in making any specific
            investment or other decisions.
          </Paragraph>
          <Paragraph>
            From time to time, reference may be made to data we have gathered.
            These references may be selective or may be partial. As markets
            change continuously, previously published information and data may
            not be current and should not be relied upon.
          </Paragraph>
          <Paragraph>
            At any time, your access to your cryptocurrency assets through the
            Site may be suspended or terminated or there may be a delay in your
            access or use of your cryptocurrency assets which may result in the
            cryptocurrency assets diminishing in value or you being unable to
            complete a smart contract and that the Site may be suspended or
            terminated for any or no reason, which may limit your access to your
            cryptocurrency assets.
          </Paragraph>
          <Paragraph>
            Accordingly, you understand and agree to take full responsibility
            for all of the risks of accessing and using the Services.
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h2" id="9-indemnification">
            <ThemeLink href="#9-indemnification">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            9. Indemnification
          </Heading>
          <Paragraph>
            You agree to indemnify and hold harmless us, our affiliates,
            contractors, licensors, and their respective directors, officers,
            employees and agents from and against any and all claims and
            expenses, including attorneys&rsquo; fees, arising out of your use
            of the Services, including, but not limited to, your violation of
            these Terms.
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h2" id="10-third-party-links">
            <ThemeLink href="#10-third-party-links">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            10. Third-Party Links
          </Heading>
          <Paragraph>
            The Site may contain hyperlinks or references to third-party
            websites. Any such links or references are provided for your
            information and convenience only. We have no control over
            third-party websites and we will not accept any legal responsibility
            for any content, material, or information contained in them. The
            display of any hyperlink and reference to any third-party website
            does not mean that we endorse that third party&rsquo;s website,
            products, or services. Your usage of a third-party site may be
            governed by the terms and conditions of that third-party site.
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h2" id="11-general">
            <ThemeLink href="#11-general">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            11. General
          </Heading>
          <Paragraph>
            We may perform any of our obligations, and exercise any of the
            rights granted to us under these Terms, through a third-party. We
            may assign any or all our rights and obligations under these Terms
            to any third-party.
          </Paragraph>
          <Paragraph>
            If any clause or part of any clause of these Terms is found to be
            void, unenforceable, or invalid, then it will be severed from these
            Terms, leaving the remainder in full force and effect, provided that
            the severance has not altered the basic nature of these Terms.
          </Paragraph>
          <Paragraph>
            No single or partial exercise, or failure or delay in exercising any
            right, power or remedy by us shall constitute a waiver by us of, or
            impair or preclude any further exercise of, that or any right, power
            or remedy arising under these Terms or otherwise.
          </Paragraph>
          <Paragraph>
            All disclaimers, indemnities and exclusions in these Terms shall
            survive termination of the Terms and shall continue to apply during
            any suspension or any period during which the Services are not
            available for you to use for any reason whatsoever.
          </Paragraph>
          <Paragraph>
            These Terms and the documents referred to in them set out the entire
            agreement between you and us with respect to your use of the
            Services, and supersede any and all prior representations,
            communications or agreements (written or oral) made between us.
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h2" id="12-governing-law">
            <ThemeLink href="#12-governing-law">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            12. Governing Law, Limitations and Jurisdiction
          </Heading>
          <Paragraph>
            These Terms, including the arbitration clause, and any dispute,
            claim or controversy arising out of or relating to these Terms, or
            the breach, termination, or validity thereof, are governed by the
            laws of Finland without regard to its principles and rules on
            conflict of laws.
          </Paragraph>
          <Paragraph>
            Any cause of action or claim you may have, arising out of or in
            relation to these Terms, or your use of the Services must be
            commenced within one (1) year after the cause of action has
            incurred, otherwise such cause of action is permanently barred.
          </Paragraph>
          <Paragraph>
            Any dispute, controversy, or claim arising out of or in relation to
            these Terms, including the validity, invalidity, breach, or
            termination thereof, or the Services provided by us, shall be
            finally settled by arbitration in accordance with the Arbitration
            Rules of the Finland Chamber of Commerce. The number of arbitrators
            shall be one and the seat of the arbitration shall be Helsinki. The
            language of the arbitration shall be Finnish. However, evidence may
            be submitted and witnesses may be heard in English, to the extent
            the arbitral tribunal deems it appropriate.
          </Paragraph>
          <Paragraph>Latest update: 15.2.2022</Paragraph>
        </Box>
      </Stack>
    </Container>
  );
};

export default PrivacyPolicy;
