import ReactSlider from "react-slider";
import './Thermometer.css';
import { ClimateContext, useClimate } from "../../context/ClimateContext";
import { useState, useEffect } from "react";

function Thermometer() {
  const { temp, setTemp } = useClimate(ClimateContext);

  // Bonus
  const [desiredTemp, setDesiredTemp] = useState(temp);

  useEffect(() => {
      const timeout = setTimeout(() => {
          if (desiredTemp > temp) setDesiredTemp(desiredTemp - 1);
          if (desiredTemp < temp) setDesiredTemp(desiredTemp + 1);
      }, 1000);

      return () => {
          clearTimeout(timeout);
      }
  }, [desiredTemp, temp]);

  return (
    <section>
      <h2>Thermometer</h2>
      <div className="actual-temp">Actual Temperature: {desiredTemp}°F</div>
      <ReactSlider
        value={temp}
        onAfterChange={(val) => {setTemp(val)}}
        className="thermometer-slider"
        thumbClassName="thermometer-thumb"
        trackClassName="thermometer-track"
        ariaLabel={"Thermometer"}
        orientation="vertical"
        min={0}
        max={120}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        renderTrack={(props, state) => (
          <div {...props} index={state.index}></div>
        )}
        invert
        pearling
        minDistance={1}
      />
    </section>
  );
}

export default Thermometer;
