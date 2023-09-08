import React, { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';

interface DataItem {
  id: number;
  text: string;
}

interface RouletteProps {
  data: DataItem[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  setOpenLetter: React.Dispatch<React.SetStateAction<boolean>>;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

const Roulette: React.FC<RouletteProps> = ({
  data,
  setOpen,
  setPoints,
  setOpenLetter,
  setPlay,
}) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [turned, setTurned] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [rouletteData, setRouletteData] = useState<
    { completeOption: string; option: string }[]
  >([]);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setTurned(true);
  };

  useEffect(() => {
    const addShortString = data.map((item) => {
      return {
        completeOption: item.text,
        option:
          item.text.length >= 30
            ? item.text.substring(0, 30).trimEnd() + '...'
            : item.text,
      };
    });
    setRouletteData(addShortString);
  }, [data]);

  useEffect(() => {
    let active = true;

    if (active && !mustSpin && rouletteData.length > 1 && turned) {
      if (rouletteData[prizeNumber].completeOption === 'Pierde turno') {
        setPoints(-1);
      } else {
        setPoints(parseInt(rouletteData[prizeNumber].completeOption));
      }
      setTurned(false);
      setTimeout(() => {
        setOpen(false);
      }, 1300);
      setTimeout(() => {
        if (rouletteData[prizeNumber].completeOption === 'Pierde turno') {
          setPlay(true);
        } else {
          setOpenLetter(true);
        }
      }, 1500);
    }

    return () => {
      active = false;
    };
  }, [
    rouletteData,
    mustSpin,
    turned,
    prizeNumber,
    setOpen,
    setPoints,
    setOpenLetter,
    setPlay,
  ]);

  return (
    <div className='roulette'>
      {rouletteData.length > 1 && (
        <>
          <div className='roulette-container align-items-center'>
            <Wheel
              mustStartSpinning={mustSpin}
              spinDuration={0.8}
              prizeNumber={prizeNumber}
              data={rouletteData.length <= 0 ? [] : rouletteData}
              outerBorderColor={'#ccc'}
              outerBorderWidth={9}
              innerBorderColor={'#f2f2f2'}
              radiusLineColor={'transparent'}
              radiusLineWidth={1}
              textColors={['#f5f5f5']}
              textDistance={60}
              fontSize={18}
              backgroundColors={[
                '#627FC0',
                '#5085A5',
                '#5982B2',
                '#627FC0',
                '#6B7CCD',
                '#7479DA',
                '#2F637D', // negro
                '#8673F5',
                '#8F70FF',
                '#986DFF',
                '#A16AFF',
                '#AA67FF',
                '#B364FF',
                '#173745', // negro
                '#C55EFF',
                '#CE5BFF',
                '#D758FF',
                '#E055FF',
                '#E952FF',
                '#F24FFF',
                '#234D69', // negro
                '#FF49F8',
                '#FF46EB',
                '#FF43DE',
                '#FF40D1',
                '#FF3DC4',
                '#FF3AB7',
                '#2F637D', // negro
              ]}
              onStopSpinning={() => {
                setMustSpin(false);
              }}
            />
            <button
              className='button roulette-button'
              onClick={handleSpinClick}
            >
              Girar
            </button>
          </div>
          <br />
          <button
            className='prize-message'
            onClick={handleSpinClick}
            disabled={mustSpin}
          >
            {!mustSpin
              ? rouletteData[prizeNumber].completeOption
              : 'Girando...'}
          </button>
        </>
      )}
    </div>
  );
};

export default Roulette;
