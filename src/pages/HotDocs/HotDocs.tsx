import NavbarBottom from '../../components/NavbarBottom';
import NavbarTop from '../../components/NavbarTop';
import './HotDocs.scss';
import { WorldMap } from './WorldMap';

const width = 1080;
const height = 540;
const clickedYear = 2019;

export default function HotDocs() {
  return (
    <>
      <NavbarTop />
      <div className="content-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-9">
              <svg
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMidYMid meet"
                style={{ width: '100%', height: 'auto' }}
              >
                <WorldMap width={width} height={height} clickedYear={clickedYear} />
              </svg>
            </div>
            <div className="col-lg-3">
              <p>HotDocs</p>
            </div>
          </div>
        </div>
      </div>
    <NavbarBottom />
    </>
  );
}
