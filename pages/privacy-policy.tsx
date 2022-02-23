import { styled } from "../stitches.config";
import { Link as LinkIconP, ArrowUpRight } from "phosphor-react";
import type * as Stitches from "@stitches/react";

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

const ExtLink: React.FC<{ href: string; css?: Stitches.CSS }> = ({
  href,
  children,
  css,
}) => {
  return (
    <Link href={href} passHref>
      {typeof children === "string" ? (
        <ThemeLink as="a" target="_blank" rel="noreferrer noopener">
          {children}
          <ArrowUpRight
            weight="light"
            style={{ marginLeft: "3px" }}
            size="14px"
          />
        </ThemeLink>
      ) : (
        ""
      )}
    </Link>
  );
};

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
          Privacy Notice
        </ThemeHeading>
        <Text
          css={{
            fontSize: "$2xl",
            lineHeight: "1.2",
          }}
        >
          With this Privacy Notice, we provide you information about why and how
          we process your personal data in Vanilla.
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
          <Heading as="h2" id="1-what-terms">
            <ThemeLink href="#1-what-terms">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            1. WHAT TERMS ARE USED IN THIS PRIVACY NOTICE?
          </Heading>
          <Paragraph>
            Controller means the party responsible for processing the personal
            data of the data subject.{" "}
          </Paragraph>
          <Paragraph>
            Data subject is a term for a human being in accordance with data
            protection laws.{" "}
          </Paragraph>
          <Paragraph>
            GDPR means the EU&rsquo;s General Data Protection Regulation
            (679/2012).{" "}
          </Paragraph>
          <Paragraph>
            Legal basis for processing means the legal ground on which the
            controller processes the data subject&rsquo;s personal data. The
            lawfulness of processing is described in Article 6 of the GDPR.{" "}
          </Paragraph>
          <Paragraph>
            Personal data means any information concerning the data subject or
            information by which the data subject can be identified.{" "}
          </Paragraph>
          <Paragraph>
            Privacy notice means a document drawn up in accordance with Articles
            13 and 14 of the GDPR, through which the controller informs data
            subjects of the ways their personal data is processed.{" "}
          </Paragraph>
          <Paragraph>
            The purpose for processing means the reason why the controller
            processes the data subject&rsquo;s personal data.{" "}
          </Paragraph>
          <Paragraph>
            Service means our decentralized staking platform on the Polygon
            &amp; Ethereum blockchains.{" "}
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h3" id="2-contact-details">
            <ThemeLink href="#2-contact-details">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            2 OUR CONTACT DETAILS
          </Heading>
          <Paragraph>Equilibrium Group Oy (business ID 2891403-1)</Paragraph>
          <Paragraph>Linnankatu 3 A 24, 20100 Turku, Finland</Paragraph>
          <Paragraph>
            If you have any questions regarding the privacy notice, please
            contact us at hello@vanilladefi.com.{" "}
          </Paragraph>
        </Box>

        <Box>
          <Heading as="h2" id="3-your-personal-data">
            <ThemeLink href="#3-your-personal-data">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            3. WHY DO WE PROCESS YOUR PERSONAL DATA?
          </Heading>
          <Paragraph>
            We process personal data solely to provide our Service (purpose for
            processing). In the provision of our Service, we process our
            customers&rsquo; and their trading partners&rsquo; (categories of
            data subjects) data on the Ethereum network related to transactions
            carried out with our Service (categories of personal data). Our
            legal basis for processing personal data is the performance of our
            contractual obligation under the Terms of Service (legal basis for
            processing).{" "}
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h3" id="4-where-do-we-collect">
            <ThemeLink href="#4-where-do-we-collect">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            4. FROM WHERE DO WE COLLECT YOUR PERSONAL DATA?
          </Heading>
          <Paragraph>
            We collect your personal data only from yourself via a device you
            choose to use.{" "}
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h4" id="5-do-we-transfer-your-data">
            <ThemeLink href="#5-do-we-transfer-your-data">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            5. DO WE TRANSFER YOUR PERSONAL DATA?
          </Heading>
          <Paragraph>
            We do not transfer your personal data. If you choose to use our
            service, you are able to transfer your own personal data to your
            trading partner.{" "}
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h2" id="6-how-long-do-we-retain-your-personal-data">
            <ThemeLink href="#6-how-long-do-we-retain-your-personal-data">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            6. HOW LONG DO WE RETAIN YOUR PERSONAL DATA?
          </Heading>

          <Paragraph>
            We retain your personal data only for as long as our service is
            actively used. Once a trade has been carried out with our service,
            we stop retaining personal data.{" "}
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h2" id="7-what-data-protection-rights">
            <ThemeLink href="#7-what-data-protection-rights">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            7. WHAT DATA PROTECTION RIGHTS DO YOU HAVE?
          </Heading>
          <Paragraph>
            You may have the right to use the data protection rights under the
            EU&rsquo;s{" "}
            <ExtLink href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri%3Dcelex%253A32016R0679%23d1e2161-1-1&amp;sa=D&amp;source=editors&amp;ust=1645004413848443&amp;usg=AOvVaw2rYQelRovH8lwRYbqcf1IE">
              General Data Protection Regulation&rsquo;s (GDPR) Articles 12
              &ndash; 22.
            </ExtLink>
          </Paragraph>

          <Paragraph>
            The contacts concerning the rights shall be submitted to the
            controller&rsquo;s contact person. Your rights can be put into
            action only when you have been satisfactorily identified.{" "}
          </Paragraph>

          <Paragraph>
            You may also have a right to lodge a complaint to the supervisory
            authority, if you think that the processing of your personal data
            infringes the data protection laws.{" "}
          </Paragraph>
        </Box>
        <Box>
          <Heading as="h3" id="8-can-this-privacy-notice">
            <ThemeLink href="#8-can-this-privacy-notice">
              <LinkIcon size="20px" />
            </ThemeLink>{" "}
            8. CAN THIS PRIVACY NOTICE BE AMENDED?
          </Heading>
          <Paragraph>
            We may unilaterally amend this privacy notice. We update the privacy
            notice as necessary, for example, when there is a change in
            legislation. Amendments to this privacy notice will take effect
            immediately when we post an updated version on our website.{" "}
          </Paragraph>

          <Paragraph>
            If we make significant changes to the privacy notice, or if there is
            a significant change in the way it is used, we will notify the data
            subjects.{" "}
          </Paragraph>

          <Paragraph>(Last update 15.2.2022)</Paragraph>
        </Box>
      </Stack>
    </Container>
  );
};

export default PrivacyPolicy;
