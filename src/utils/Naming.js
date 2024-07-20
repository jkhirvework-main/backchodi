class Naming {

    static Wire = 'wire';
    static Component = 'component';
    static Pin = 'pin';
    static MultiConnectorPin = 'multi_connector_pin'
    static BaseWire = 'baseWire'
    static Circle = 'circle'
    static MultiConnector = 'multiConnector'
    static Widget = 'widget';
    static Background = 'background'
    static Switch = 'switch';
    static GroupRectangle = 'group_rectangle'
    static Text = 'text';
    static Connector = 'connector'
    static Icon = 'icon'
    static TriangleComponent = 'triangleComponent';
    static EndComponent = 'endComponent';
    static ComponentCheck = 'component_check';

    static Bottom = 'bottom';
    static Top = 'top';
    static Right = 'right';
    static Left = 'left'
    static Center = 'center'

    static LeftKey = 1;
    static RightKey = 3;

    static isLeftKey = (e) => e.button == Naming.LeftKey;

    static isTop = (direction) => direction === Naming.Top
    static isLeft = (direction) => direction === Naming.Left
    static isRight = (direction) => direction === Naming.Right
    static isBottom = (direction) => direction === Naming.Bottom
    static isVertical = (direction) => (Naming.isTop(direction) || Naming.isBottom(direction))
    static isHorizontal = (direction) => !Naming.isVertical(direction)
}

export default Naming;