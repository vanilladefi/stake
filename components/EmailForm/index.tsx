import { FC, FormEvent, useEffect } from "react";
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
  padding: "0 $3 !important",
});

const EmailForm: FC = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
    async (e: FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        setError(null);
        if (!isValid) {
          setError("Please provide a valid email");
          return;
        }

        setIsLoading(true);

        const res = await fetch("/api/subscribe", {
          method: "POST",
          body: JSON.stringify({
            email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const { error } = await res.json();

        if (error) {
          throw error;
        }

        setIsDone(true);
        setEmail("");
      } catch (error) {
        // maybe do something with it
        setError("Something went wrong, try again later!");
      } finally {
        setIsLoading(false);
      }
    },
    [isValid, email, setError, setIsDone, setIsLoading]
  );

  return (
    <Box fluid>
      {isDone ? (
        <Box css={{ textAlign: "center" }}>Information sent. Well done!</Box>
      ) : (
        <fieldset disabled={isLoading}>
          <form noValidate onSubmit={onSubmit}>
            <Flex>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.currentTarget.value)}
                autoCapitalize="off"
                autoCorrect="off"
                size="lg"
                variant="bordered"
                css={{
                  fontSize: "$lg",
                  px: "$3",
                  width: "100%",
                  mb: "$1",
                  mr: '1px'
                }}
                placeholder="Email address"
              />
              <SendButton disabled={isLoading} muted={!isValid} type="submit" variant="primary">
                <StyledArrow />
              </SendButton>
            </Flex>
            <ErrorText>{error}</ErrorText>
          </form>
        </fieldset>
      )}
    </Box>
  );
};

export default EmailForm;
