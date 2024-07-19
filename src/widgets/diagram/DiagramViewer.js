import Utils from "@/utils/Utils";
import DataLoader from "./DataLoader";
import Config from "@/utils/Config";
import Naming from "@/utils/Naming";
import { fabric } from "fabric";
import Storage from "@/utils/Storage";

class DiagramViewer {

    constructor(data) {
        this.dataParser(data)
        this.data = data;
        this.initCanvas();
        Utils.diagramViewer = this;


        this.space = false;
        this.cntrl = false;
        this.shiftLeft = false;

        this.moving = false;
        this.tmpLastPos = null;

        new DataLoader(data)
    }

    initCanvas = () => {
        Utils.fabric = fabric;

        if(!Utils.canvas){
            this.canvas = new fabric.Canvas('canvas', {
                height: Config.canvasHeight,
                width: Config.canvasWidth,
                selection: false,
                renderOnAddRemove: true,
                stopContextMenu: true,
                fireRightClick: true,
                preserveObjectStacking: true,
                backgroundColor: 'white',
            })
    
            const mRect = new fabric.Rect( {
                height: this.data.height,
                width: this.data.width,
                stroke: 'black',
                strokeWidth: 1,
                fill: 'white',
                hasControls: false,
                selectable: false
                
            })
    
            this.canvas.add(mRect)
    
            Utils.canvas = this.canvas;
            Utils.backgroundWidth = this.data.width;
            Utils.backgroundHeight = this.data.height;
            Config.backgroundWidth = this.data.width;
            Config.backgroundHeight = this.data.height;
    
            this.setBtnsCallBack();
            this.setCallBack();
            this.setUpZoom();
        }
        

    }

    setBtnsCallBack() {
        document.body.onkeydown = (e) => {
            switch (e.code) {
                case 'Space':
                    this.space = true
                    break;
                case 'ShiftLeft':
                    this.shiftLeft = true;
                    break;
                case 'ControlLeft':
                    if (!this.cntrlClicked) {
                        this.cntrl = true;
                        this.cntrlClicked = true
                        this.lastMousePos = this.tmpLastPos
                    }
                    break;
            }
        }

        document.body.onkeyup = (e) => {
            if (this.space) {
                this.space = false
                this.tmpSpace = false;
            }

            if (this.shiftLeft) this.shiftLeft = false;

            if (this.cntrl) {
                this.cntrl = false
                this.cntrlClicked = false;
            };
        };
    }


    setCallBack = () => {
        let lastTouch = null;
        Utils.canvas.on('mouse:down', (e) => {
            const e2 = e.e;
            if (Naming.isLeftKey(e)) {
                this.moving = true;

                const { x, y } = e.absolutePointer;
                this.down = true;
            }

            if (e2.changedTouches) {

                lastTouch = {x: e2.changedTouches[0].clientX, y: e2.changedTouches[0].clientY}
            }

        })

        Utils.canvas.on('mouse:move', (e) => {
            this.tmpLastPos = e.absolutePointer;
            // this.space &&
        
            if (this.down && (e.e instanceof MouseEvent || ((e.e instanceof TouchEvent) && e.e.touches.length < 2))) {
                const e2 = e.e;

                let delta = new fabric.Point(e2.movementX, e2.movementY);
                if (e2.changedTouches) {
                    delta = new fabric.Point( e2.changedTouches[0].clientX - lastTouch.x, e2.changedTouches[0].clientY - lastTouch.y);
                    lastTouch = {x: e2.changedTouches[0].clientX, y: e2.changedTouches[0].clientY}
                }

                window.requestAnimationFrame(() => {
                    Utils.canvas.relativePan(delta);
                })
            }
        });

        Utils.canvas.on('mouse:up', (e) => {
            // this.space && 

            
            // if(e.e.)

            
            if (this.down && !(e.e instanceof TouchEvent)) {
                const e2 = e.e;
                let delta = new fabric.Point(e2.movementX, e2.movementY);
                if (e2.changedTouches) {
                    delta = new fabric.Point( e2.changedTouches[0].clientX - lastTouch.x, e2.changedTouches[0].clientY - lastTouch.y);
                    lastTouch = {x: e2.changedTouches[0].clientX, y: e2.changedTouches[0].clientY}
                }
                Utils.canvas.relativePan(delta)
            }

            if (this.down) {
                this.down = false
            }
        });
    }


    zoomIn = () => {
        const centerWidth = Config.canvasWidth / 2, centerHeight = Config.canvasHeight / 2;
        const zoom = Utils.canvas.getZoom();

        Utils.fabric.util.animate({
            startValue: zoom,
            endValue: parseInt(zoom) + 1,
            duration: 300,
            easing: Utils.fabric.util.ease.easeOutQuad,
            onChange: (v) => {
                Utils.canvas.zoomToPoint({ x: centerWidth, y: centerHeight }, v);
            }, onComplete: () => {
                Utils.renderAll()
            }
        })
    }

    zoomOut = () => {
        const centerWidth = Config.canvasWidth / 2, centerHeight = Config.canvasHeight / 2;
        const zoom = Utils.canvas.getZoom();

        Utils.fabric.util.animate({
            startValue: zoom,
            endValue: zoom > 1 ? zoom - 1 : zoom - 0.1,
            duration: 300,
            easing: Utils.fabric.util.ease.easeOutQuad,
            onChange: (v) => {
                Utils.canvas.zoomToPoint({ x: centerWidth, y: centerHeight }, v);
            }, onComplete: () => {
                // Utils.renderAll()
            }
        })
    }

    setUpZoom = () => {
        const panAmount = 60;

        this.canvas.on('mouse:wheel', (mE) => {
            const { e } = mE;
            if (this.cntrl) {
                handleZoom(e);
            } else if (this.shiftLeft) {
                handleHorizontalPan(e);
            } else {
                handlePan(e);
            }
        });

        // Handle touch events
        let touchStartDistance = 0;
        let isPanning = false;

        console.log('worked')
        document.addEventListener('touchstart', (e) => {
            
            if (e.touches.length === 2) {
                touchStartDistance = getTouchDistance(e.touches);
                isPanning = false;
            } 
            // else if (e.touches.length === 1) {
            //     isPanning = true;
            //     const touch = e.touches[0];
            //     lastTouchX = touch.pageX;
            //     lastTouchY = touch.pageY;
            // }
        });

        document.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2 && !isPanning) {
                const newDistance = getTouchDistance(e.touches);
                const zoom = this.canvas.getZoom() * (newDistance / touchStartDistance);
                touchStartDistance = newDistance;
                handleZoomTouch(e, zoom);
            } 
            // else if (isPanning && e.touches.length === 1) {
            //     handlePanTouch(e);
            // }
            e.preventDefault();
        });

        document.addEventListener('touchend', (e) => {
            // e.preventDefault();
            if (e.touches.length === 0) {
                isPanning = false;
                touchStartDistance = 0;
            }
        });

        const handleZoom = (e) => {
            const canvas = Utils.canvas;
            let delta = e.deltaY;
            let zoom = canvas.getZoom();
            zoom *= 0.999 ** delta;
            if (zoom > 20) zoom = 20;
            if (zoom < 0.01) zoom = 0.01;
            canvas.zoomToPoint({ x: e.offsetX, y: e.offsetY }, zoom);
            adjustViewportTransform(zoom);
            e.preventDefault();
            e.stopPropagation();
        };

        const handleZoomTouch = (e, zoom) => {
            const canvas = Utils.canvas;
            if (zoom > 20) zoom = 20;
            if (zoom < 0.01) zoom = 0.01;
            const touch = e.touches[0];
            canvas.zoomToPoint({ x: touch.pageX, y: touch.pageY }, zoom);
            // adjustViewportTransform(zoom);
        };

        const handlePan = (e) => {
            let deltaX = e.deltaX === 0 ? 0 : e.deltaX > 0 ? -panAmount : panAmount;
            let deltaY = e.deltaY === 0 ? 0 : e.deltaY > 0 ? -panAmount : panAmount;
            const delta = { x: deltaX, y: deltaY };
            Utils.canvas.relativePan(delta);
        };

        const handleHorizontalPan = (e) => {
            let deltaY = e.deltaY === 0 ? 0 : e.deltaY > 0 ? -panAmount : panAmount;
            const delta = { x: deltaY, y: 0 };
            Utils.canvas.relativePan(delta);
        };

        const handlePanTouch = (e) => {
            const touch = e.touches[0];
            const delta = { x: touch.pageX - lastTouchX, y: touch.pageY - lastTouchY };
            Utils.canvas.relativePan(delta);
            lastTouchX = touch.pageX;
            lastTouchY = touch.pageY;
        };

        const getTouchDistance = (touches) => {
            const [touch1, touch2] = touches;
            return Math.sqrt(
                Math.pow(touch2.pageX - touch1.pageX, 2) +
                Math.pow(touch2.pageY - touch1.pageY, 2)
            );
        };

        const adjustViewportTransform = (zoom) => {
            const canvas = Utils.canvas;
            const vpt = canvas.viewportTransform;
            if (zoom < Config.canvasWidth / Config.backgroundWidth) {
                vpt[4] = (Config.canvasWidth / 2) - (Config.backgroundWidth * zoom / 2);
                vpt[5] = (Config.canvasHeight / 2) - (Config.backgroundHeight * zoom / 2);
            } else {
                if (vpt[4] >= 0) {
                    vpt[4] = 0;
                } else if (vpt[4] < canvas.getWidth() - Config.backgroundWidth * zoom) {
                    vpt[4] = canvas.getWidth() - Config.backgroundWidth * zoom;
                }
                if (vpt[5] >= 0) {
                    vpt[5] = 0;
                } else if (vpt[5] < canvas.getHeight() - Config.backgroundHeight * zoom) {
                    vpt[5] = canvas.getHeight() - Config.backgroundHeight * zoom;
                }
            }
        };

        let lastTouchX = 0;
        let lastTouchY = 0;
    };

    dataParser = (data) => {
    }

    hideConnections = () => {
        for(const connection of Storage.connections){
            connection.hide();
        }

        Utils.renderAll()
    }

    showConnections = () => {
        for(const connection of Storage.connections){
            connection.show();
        }

        Utils.renderAll()
    }

    reset = () => {
        const center = Config.canvasWidth / 2 - Config.backgroundWidth / 2;

        

        for(const component of Storage.components){
            component.unSelect()
        }

        for(const connection of Storage.connections){
            connection.unselect();
        }

        const centerWidth = Config.canvasWidth / 2, centerHeight = Config.canvasHeight / 2;
        const zoom = Utils.canvas.getZoom();

        Utils.fabric.util.animate({
            startValue: zoom,
            endValue: 1,
            duration: 300,
            easing: Utils.fabric.util.ease.easeOutQuad,
            onChange: (v) => {
                Utils.canvas.zoomToPoint({ x: centerWidth, y: centerHeight }, v);
            }, onComplete: () => {
                Utils.canvas.absolutePan(new Utils.fabric.Point(-center, 0));
                Utils.renderAll()
            }
        })

        // Utils.renderAll()
    }
}


export default DiagramViewer;