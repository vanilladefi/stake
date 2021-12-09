import { FC, FormEvent, FormEventHandler, useEffect } from "react";
import { useState, useCallback } from "react";
import { isValidEmail } from "../../utils/helpers";
import Box from "../Box";
import Flex from "../Flex";
import Text from "../Text";
import Input from "../Input";
import Button from "../Button";
import { styled } from "../../stitches.config";
import { ArrowRight } from "../../assets";

const ErrorText = styled(Text, {
  fontSize: "$sm",
  color: "$red",
});

const StyledArrow = styled(ArrowRight, {
  color: "$black",
  "& path": {
    stroke: "currentColor",
  },
});

const SendButton = styled(Button, {
  padding: "0 !important",
  height: "$12 !important",
  width: "$12 !important",
});

const EmailForm: FC = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);

  // update isValid, if needed, when email changes
  useEffect(() => {
    if (isValidEmail(email) && !isValid) setIsValid(true);
    else if (!isValidEmail(email) && isValid) setIsValid(false);
  }, [email, isValid]);

  // remove error warning on email change
  useEffect(() => {
    setError(null);
  }, [email]);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        setError(null);
        if (!isValid) {
          setError("Please provide a valid email");
          return;
        }

        const form = e.currentTarget;
        form.submit();

        setEmail("");
        setIsDone(true);
      } catch (error) {
        setError("Something went wrong, try again later!");
      }
    },
    [isValid, setError, setIsDone]
  );

  return (
    <Box fluid>
      {isDone ? (
        <Box css={{ textAlign: "center" }}>Information sent. Well done!</Box>
      ) : (
        <form
          noValidate
          target="_blank"
          method="POST"
          action="https://vanilladefi.us20.list-manage.com/subscribe/post"
          onSubmit={onSubmit}
        >
          <input type="hidden" name="u" value="ac29ad6dc785f7c2616c26c70" />
          <input type="hidden" name="id" value="c01a7fd564" />

          <input
            type="hidden"
            name="ht"
            value="6f00a7136837c9cbac12940ff6323a96844c7c1a:MTYzOTA0Mzc2OS43MjM="
          />
          <input type="hidden" name="mc_signupsource" value="hosted" />

          <Flex>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.currentTarget.value)}
              autoCapitalize="off"
              autoCorrect="off"
              name="MERGE0"
              id="MERGE0"
              size="lg"
              variant="bordered"
              css={{
                fontSize: "$lg",
                px: "$3",
                width: "100%",
                mb: "$1",
              }}
              placeholder="Email address"
            />
            {isValid && (
              <SendButton type="submit" variant="primary">
                <StyledArrow />
              </SendButton>
            )}
          </Flex>
            <ErrorText>{error}</ErrorText>
        </form>
      )}
    </Box>
  );
};

export default EmailForm;
