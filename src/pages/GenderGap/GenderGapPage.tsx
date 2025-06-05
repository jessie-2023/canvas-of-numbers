import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarTop from '../../components/NavbarTop';
import './GenderGap.scss';
import { TrendBar } from './TrendBar';
import { WorldMap } from './WorldMap';
import NavbarBottom from '../../components/NavbarBottom';

const width = 960;
const height = 520;
const mapShare = 0.75;
const barShare = 0.4;

export default function GenderGap() {
  const [clickedCountry, setClickedCountry] = useState<number>(352);
  const [clickedYear, setClickedYear] = useState<number>(2019);

  return (
    <>
      <NavbarTop />
      <div className="content-container">
      <div className="row">
        <div className="col-md-3 starting-point mt-3">
          <p>
            <strong className="hook">Initial Question:</strong> <em>Why women fight?</em>
          </p>
        </div>
        <div className="col-md-9 dataviz-title mt-3">
          <p>The big picture: How Far Have We Come? </p>
          <p className="source">
            Main data: &nbsp;
            <Link
              to={
                'https://www.weforum.org/publications/global-gender-gap-report-2024/global-gender-gap-2024-dashboard/'
              }
            >
              The Global Gender Gap Report
            </Link>{' '}
            &nbsp; published by the World Economic Forum.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 reasoning-line">
          <p>
            There is a huge variance in gender equality across the world, although observable
            progress has been made.
          </p>
          <ul>
            <li>
              Political empowerment is the weakest dimension; only Scandinavian countries have made
              significant progress.
            </li>
            <li>Most countries are still struggling to provide equal economic opportunities.</li>
            <li>About half of the countries have achieved equal conditions in education.</li>
            <li>
              Most countries have equal health conditions—even Yemen, which has the lowest overall
              score, performs relatively well in this area.
            </li>
          </ul>
        </div>
        <div className="col-md-9">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ width: '100%', height: 'auto' }}
          >
            <g transform={`scale(${mapShare}) translate(0, 20)`}>
              <WorldMap
                width={width}
                height={height}
                setClickedCountry={setClickedCountry}
                clickedCountry={clickedCountry}
                clickedYear={clickedYear}
              />
            </g>
            {/* map caption - move into map later, reorganize legend */}
            <g transform={`translate(${innerWidth / 2 + 150}, 20)`}>
              <text x={5} y={0} className="note-title" textAnchor="middle">
                Gender Equality Worldwide in {clickedYear}
              </text>
              <text x={-50} y={15} className="axis-label" textAnchor="start">
                - Hover to see general information of each country
              </text>
              <text x={-50} y={35} className="axis-label" textAnchor="start">
                - Click to see country-specific progress between 2005 and 2019 in bar chart
              </text>
            </g>
            <g transform={`translate(-80, ${height - barShare * height})`}>
              <TrendBar
                width={width}
                height={barShare * height}
                setClickedYear={setClickedYear}
                clickedYear={clickedYear}
                clickedCountry={clickedCountry}
              />
            </g>
          </svg>
        </div>
      </div>
      <div className="row text-start">
        <div className="col-md-12  ">
          <p>
            <strong className="hook">Follow-up questions and next steps:</strong>
          </p>
          <ul>
            <li>Add data between 2020-2023, explore the effect of Covid.</li>
            <li>
              How hard do women have to fight in different countries? Are public perceptions
              consistent with the index? (Requires attitude/opinion survey data)
            </li>
            <li>Does gender equality naturally accompany economic growth?</li>
            <li>How are feminist ideas transmitted across countries?</li>
            <li>What role does technology play?</li>
          </ul>
        </div>
        </div>
        </div>
    <NavbarBottom />
    </>
  );
}
