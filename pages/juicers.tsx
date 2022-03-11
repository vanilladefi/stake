import { GetStaticProps } from "next";
import { useCallback, useEffect } from "react";
import Container from '../components/Container';
import { JuicerColumn, JuicerList } from '../components/JuicerList';
import { state, useSnapshot } from "../state";

const Juicers = () => {
  const {} = useSnapshot(state);

  useEffect(() => { }, []);
  

  const getData = useCallback((): JuicerColumn[] => {
    return [
      {
        juicer: "mama's boy",
        juiceAmount: "12345.`5",
        performanceHourly: "5.5",
        performanceWeekly: "-6.8",
      },
      {
        juicer: "Someoneelse.eth",
        juiceAmount: "12345.5",
        performanceHourly: "22.56",
        performanceWeekly: "-5.33",
      },
      {
        juicer: "mama's boy",
        juiceAmount: "12345.5",
        performanceHourly: "5.5",
        performanceWeekly: "-6.8",
      },
      {
        juicer: "Someoneelse.eth",
        juiceAmount: "12345.5",
        performanceHourly: "22.56",
        performanceWeekly: "-5.33",
      },
      {
        juicer: "mama's boy",
        juiceAmount: "12345.5",
        performanceHourly: "5.5",
        performanceWeekly: "-6.8",
      },
      {
        juicer: "Someoneelse.eth",
        juiceAmount: "12345.5",
        performanceHourly: "22.56",
        performanceWeekly: "-5.33",
      },
     
    ];
  }, []);

  return <Container>
    <JuicerList title='Leaderboard' getData={getData} />
  </Container>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    return {
      props: {},
      revalidate: 5,
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
      revalidate: 5,
    };
  }
};

export default Juicers;
