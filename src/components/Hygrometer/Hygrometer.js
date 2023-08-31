import ReactSlider from "react-slider";
import "./Hygrometer.css";
import { useClimate } from "../../context/ClimateContext";
import { useEffect, useState } from "react";

function Hygrometer() {
const { humidity, setHumidity } = useClimate();
// Bonus
const [desiredHumidity, setDesiredHumidity] = useState(humidity);

useEffect(() => {
    const timeout = setTimeout(() => {
      // Instructions say 2 percent, but I got stuck on odd numbers
        if (desiredHumidity > humidity) setDesiredHumidity(desiredHumidity - 1);
        if (desiredHumidity < humidity) setDesiredHumidity(desiredHumidity + 1);
    }, 1000);

    return () => {
        clearTimeout(timeout);
    }
}, [desiredHumidity, humidity]);

  return (
    <section>
      <h2>Hygrometer</h2>
      <div className="actual-humid">Actual Humidity: {desiredHumidity}%</div>
      <ReactSlider
        value={humidity}
        onAfterChange={(val) => {setHumidity(val)}}
        className="hygrometer-slider"
        thumbClassName="hygrometer-thumb"
        trackClassName="hygrometer-track"
        ariaLabel={"Hygrometer"}
        orientation="vertical"
        min={0}
        max={100}
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

export default Hygrometer;
