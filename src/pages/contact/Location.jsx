export const Location = () => {
  return (
    <>
      <section className="container mb-50 d-none d-md-block">
        <div className="border-radius-15 overflow-hidden">
          <div
            id="map-panes"
            className="leaflet-map leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
            tabIndex="0"
            style={{ position: "relative", outline: "none" }}
          >
            <div
              className="leaflet-pane leaflet-map-pane"
              style="transform: translate3d(0px, 0px, 0px);"
            >
              <div className="leaflet-pane leaflet-tile-pane">
                <div
                  className="leaflet-layer "
                  style={{ zIndex: "1", opacity: "1" }}
                >
                  <div
                    className="leaflet-tile-container leaflet-zoom-animated"
                    style={{
                      zIndex: "18",
                      transform: "translate3d(-1px, -1px, 0px) scale(1)",
                    }}
                  >
                    <img
                      alt=""
                      role="presentation"
                      src="https://b.basemaps.cartocdn.com/light_nolabels/2/1/0.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(535px, -79px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="https://c.basemaps.cartocdn.com/light_nolabels/2/2/0.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(791px, -79px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="https://c.basemaps.cartocdn.com/light_nolabels/2/1/1.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(535px, 177px, 0px)",
                        opacity: " 1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="https://a.basemaps.cartocdn.com/light_nolabels/2/2/1.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(791px, 177px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="https://a.basemaps.cartocdn.com/light_nolabels/2/0/0.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(279px, -79px, 0px)",
                        opacity: " 1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="https://a.basemaps.cartocdn.com/light_nolabels/2/3/0.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(1047px, -79px, 0px)",
                        opacity: " 1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="https://b.basemaps.cartocdn.com/light_nolabels/2/0/1.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(279px, 177px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="https://b.basemaps.cartocdn.com/light_nolabels/2/3/1.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(1047px, 177px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="https://a.basemaps.cartocdn.com/light_nolabels/2/3/0.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(23px, -79px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="https://a.basemaps.cartocdn.com/light_nolabels/2/0/0.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(1303px, -79px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="https://b.basemaps.cartocdn.com/light_nolabels/2/3/1.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(23px, 177px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="https://b.basemaps.cartocdn.com/light_nolabels/2/0/1.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(1303px, 177px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="https://c.basemaps.cartocdn.com/light_nolabels/2/2/0.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(-233px, -79px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="https://b.basemaps.cartocdn.com/light_nolabels/2/1/0.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(1559px, -79px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="https://a.basemaps.cartocdn.com/light_nolabels/2/2/1.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(-233px, 177px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="https://c.basemaps.cartocdn.com/light_nolabels/2/1/1.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(1559px, 177px, 0px)",
                        opacity: "1",
                      }}
                    />
                  </div>
                  <div
                    className="leaflet-tile-container leaflet-zoom-animated"
                    style={{
                      zIndex: "17",
                      transform: "translate3d(-2px, -2px, 0px) scale(2)",
                    }}
                  ></div>
                </div>
              </div>
              <div className="leaflet-pane leaflet-shadow-pane"></div>
              <div className="leaflet-pane leaflet-overlay-pane"></div>
              <div className="leaflet-pane leaflet-marker-pane"></div>
              <div className="leaflet-pane leaflet-tooltip-pane"></div>
              <div className="leaflet-pane leaflet-popup-pane"></div>
              <div
                className="leaflet-proxy leaflet-zoom-animated"
                style={{ transform: "translate3d(514.5px, 254.766px, 0px)" }}
              ></div>
              <div
                className="leaflet-pane leaflet-labels-pane"
                style={{ zIndex: "650", pointerEvents: "none" }}
              >
                <div
                  className="leaflet-layer "
                  style={{ zIndex: "1", opacity: "1" }}
                >
                  <div
                    className="leaflet-tile-container leaflet-zoom-animated"
                    style={{
                      zIndex: "18",
                      transform: "translate3d(-1px, -1px, 0px)",
                    }}
                  >
                    <img
                      alt=""
                      role="presentation"
                      src="http://b.basemaps.cartocdn.com/light_only_labels/2/1/0.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(535px, -79px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="http://c.basemaps.cartocdn.com/light_only_labels/2/2/0.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(791px, -79px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="http://c.basemaps.cartocdn.com/light_only_labels/2/1/1.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(535px, 177px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="http://a.basemaps.cartocdn.com/light_only_labels/2/2/1.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(791px, 177px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="http://a.basemaps.cartocdn.com/light_only_labels/2/0/0.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(279px, -79px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="http://a.basemaps.cartocdn.com/light_only_labels/2/3/0.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(1047px, -79px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="http://b.basemaps.cartocdn.com/light_only_labels/2/0/1.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(279px, 177px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="http://b.basemaps.cartocdn.com/light_only_labels/2/3/1.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(1047px, 177px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="http://a.basemaps.cartocdn.com/light_only_labels/2/3/0.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(23px, -79px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="http://a.basemaps.cartocdn.com/light_only_labels/2/0/0.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(1303px, -79px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="http://b.basemaps.cartocdn.com/light_only_labels/2/3/1.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(23px, 177px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="http://b.basemaps.cartocdn.com/light_only_labels/2/0/1.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(1303px, 177px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="http://c.basemaps.cartocdn.com/light_only_labels/2/2/0.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(-233px, -79px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="http://b.basemaps.cartocdn.com/light_only_labels/2/1/0.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(1559px, -79px, 0px)",
                        opacity: "1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="http://a.basemaps.cartocdn.com/light_only_labels/2/2/1.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(-233px, 177px, 0px)",
                        opacity: " 1",
                      }}
                    />
                    <img
                      alt=""
                      role="presentation"
                      src="http://c.basemaps.cartocdn.com/light_only_labels/2/1/1.png"
                      className="leaflet-tile leaflet-tile-loaded"
                      style={{
                        width: "256px",
                        height: "256px",
                        transform: "translate3d(1559px, 177px, 0px)",
                        opacity: "1",
                      }}
                    />
                  </div>
                  <div
                    className="leaflet-tile-container leaflet-zoom-animated"
                    style={{
                      zIndex: "17",
                      transform: "translate3d(-2px, -2px, 0px)",
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="leaflet-control-container">
              <div className="leaflet-top leaflet-left">
                <div className="leaflet-control-zoom leaflet-bar leaflet-control">
                  <a
                    className="leaflet-control-zoom-in"
                    href="#"
                    title="Zoom in"
                    role="button"
                    aria-label="Zoom in"
                  >
                    +
                  </a>
                  <a
                    className="leaflet-control-zoom-out"
                    href="#"
                    title="Zoom out"
                    role="button"
                    aria-label="Zoom out"
                  >
                    −
                  </a>
                </div>
              </div>
              <div className="leaflet-top leaflet-right"></div>
              <div className="leaflet-bottom leaflet-left"></div>
              <div className="leaflet-bottom leaflet-right">
                <div className="leaflet-control-attribution leaflet-control">
                  <a
                    href="https://leafletjs.com"
                    title="A JS library for interactive maps"
                  >
                    Leaflet
                  </a>{" "}
                  | ©{" "}
                  <a href="https://www.openstreetmap.org/copyright">
                    OpenStreetMap
                  </a>{" "}
                  contributors, ©{" "}
                  <a href="https://carto.com/attribution">CARTO</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
