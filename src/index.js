import "./index.scss";
import { ChartContainer, Title, Source } from "@newamerica/meta";
import { Chart, Bar } from "@newamerica/charts";
import { format } from "d3-format";

let queue = [];
let data = null;

const formatPercent = d => format(".0%")(d);

const settings = {
  unga: el => {
    const _data = data.us_unga.map(d => ({ year: d.year, value: +d.value }));
    ReactDOM.render(
      <ChartContainer style={{ maxWidth: 600 }}>
        <Title>
          Percentage of Women in U.S. Delegations to the UN General Assembly
          (UNGA) First Committee on Disarmament and International Security
          (1980-2015)
        </Title>
        <Chart
          maxWidth={600}
          aspectRatio={0.6}
          renderTooltip={({ datum }) => (
            <div>
              {datum.year}: <b>{formatPercent(datum.value)}</b>
            </div>
          )}
        >
          {props => (
            <Bar
              data={_data}
              x={d => d.year}
              y={d => d.value}
              numTicksX={8}
              margin={{ top: 10, left: 30, bottom: 30, right: 10 }}
              yFormat={d => formatPercent(d)}
              {...props}
            />
          )}
        </Chart>
        <Source>
          Source: Data courtesy of the International Law and Policy Institute
          (ILPI) and United Nations Institute for Disarmament Research (UNIDIR),
          and the 2016 report “
          <a
            href="http://www.unidir.org/files/publications/pdfs/gender-development-and-nuclear-weapons-en-659.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gender, Development and Nuclear Weapons
          </a>
          ,” by John Borrie, Anne Guro Dimmen, Torbjørn Graff Hugo, Camilla
          Waszink, and Kjølv Egeland.
        </Source>
      </ChartContainer>,
      el
    );
  },
  npt: el => {
    const _data = data.us_npt.map(d => ({ year: d.year, value: +d.value }));
    ReactDOM.render(
      <ChartContainer style={{ maxWidth: 600 }}>
        <Title>
          Percentage of Women in U.S. Delegations to the Treaty on the
          Non-Proliferation of Nuclear Weapons (NPT) Review Conferences
          (1980-2015)
        </Title>
        <Chart
          maxWidth={600}
          aspectRatio={0.6}
          renderTooltip={({ datum }) => (
            <div>
              {datum.year}: <b>{formatPercent(datum.value)}</b>
            </div>
          )}
        >
          {props => (
            <Bar
              data={_data}
              x={d => d.year}
              y={d => d.value}
              numTicksX={8}
              margin={{ top: 10, left: 30, bottom: 30, right: 10 }}
              yFormat={d => formatPercent(d)}
              {...props}
            />
          )}
        </Chart>
        <Source>
          Source: Data courtesy of the International Law and Policy Institute
          (ILPI) and United Nations Institute for Disarmament Research (UNIDIR),
          and the 2016 report “
          <a
            href="http://www.unidir.org/files/publications/pdfs/gender-development-and-nuclear-weapons-en-659.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gender, Development and Nuclear Weapons
          </a>
          ,” by John Borrie, Anne Guro Dimmen, Torbjørn Graff Hugo, Camilla
          Waszink, and Kjølv Egeland.
        </Source>
      </ChartContainer>,
      el
    );
  }
};

fetch("https://na-data-projects.s3.amazonaws.com/data/pr/nuclear_security.json")
  .then(response => response.json())
  .then(_data => {
    data = _data;
    for (let i = 0; i < queue.length; i++) queue[i]();
  });

window.renderDataViz = function(el) {
  let id = el.getAttribute("id");
  let chart = settings[id];
  if (!chart) return;

  if (data) {
    chart(el);
  } else {
    queue.push(() => chart(el));
  }
};
