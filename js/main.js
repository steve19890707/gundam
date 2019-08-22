var scene,renderer,camera,cameraControl
let gui
var gundamObj
var ML_mainColor,ML_secondColor,ML_lightingColor

class Gundam {
    constructor(){
        // 1.部件形狀
        // a.頭部
        // --------------------------------------------------------------------------------
            const head_antenna = new THREE.ConeGeometry(3,35,3,false,0)
            const head_coreTop = new THREE.CylinderGeometry(5,6,6,3,14,false,0,3.14)
            const head_coreBottom = new THREE.CylinderGeometry(5.8,6.5,6,3,1,false,0)
            const head_cover = new THREE.SphereGeometry(20,32,32,0,2.5,0,3.14)
            const head_topModel = new THREE.Shape()
            var HT_length = 5, HT_width = 10
                head_topModel.moveTo(0,0)
                head_topModel.lineTo(0,HT_width)
                head_topModel.lineTo(HT_length,HT_width)
                head_topModel.lineTo(HT_length,0)
                head_topModel.lineTo(0,0)
                var HT_extrudeSettings = {
                    steps: 2,
                    depth: 4,
                    bevelEnabled: true,
                    bevelThickness: -1.5,
                    bevelSize: 2,
                    bevelSegments: 2
                }
            const head_topModelGeometry = new THREE.ExtrudeGeometry(head_topModel,HT_extrudeSettings)
            const head_afterHT = new THREE.BoxGeometry(7,13,20)
            const head_afterHT2 = new THREE.BoxGeometry(7,13,10)
            const head_back = new THREE.CylinderBufferGeometry(20,20,25,4,1,false,0,3.14)
            const head_SideA = new THREE.BoxGeometry(8,25,10)
            const head_SideB = new THREE.CylinderBufferGeometry(6,11,20,3,1,false,0,3.14)
            const head_SideC = new THREE.BoxGeometry(4,22,8)
            const head_faceA = new THREE.CylinderGeometry(13,6,15,4,1,false,0,3.14)
            const head_faceB = new THREE.CylinderGeometry(11,13,2,4,1,false,0,3.14)
            const head_faceC = new THREE.BoxGeometry(4,6,6)
            const head_faceD = new THREE.BoxGeometry(2,12,8)
            const head_inside = new THREE.BoxGeometry(16,16,3)
            const head_insideB = new THREE.BoxGeometry(3.5,3.5,6)
            const head_eye = new THREE.CylinderGeometry(5.5,4,2,3,1,false,0,3.14)
            const head_beardMode = new THREE.BoxGeometry(4,0.5,1)
            const head_beardMode2 = new THREE.BoxGeometry(0.5,1.5,2)
            const head_Light = new THREE.BoxGeometry(5,10,2)
            const head_skyLine = new THREE.CylinderGeometry(0.7,0.7,15,32,1,false,0)
        // b.身體
        // --------------------------------------------------------------------------------
            const body_core = new THREE.BoxGeometry(80,45,80)
            const body_coreCut = new THREE.BoxGeometry(80,45,20)
            const body_cabin = new THREE.BoxGeometry(18,40,15)
            const body_cabinCut = new THREE.BoxGeometry(12,30,8)
            const body_waistTop = new THREE.CylinderGeometry(45,40,17,4,1,false,0)
            const body_waistBottom = new THREE.CylinderGeometry(38,42,15,4,1,false,0)
            const body_neck = new THREE.CylinderGeometry(10,13,23,5,1,false,0)
            const body_dec = new THREE.BoxGeometry(4,8,55)
            const body_dec2 = new THREE.BoxGeometry(47,8,4)
            const body_dec3 = new THREE.CylinderGeometry(15,20,2,3,1,false,0)
            const body_chestAir = new THREE.BoxGeometry(20,13,3)
            const body_chestBorder = new THREE.BoxGeometry(16,1,5)
        // c.手臂
        // --------------------------------------------------------------------------------
            const hand_rod = new THREE.CylinderGeometry(7,7,30,32,1,false,0)
            const hand_shoulder = new THREE.SphereGeometry(15,32,32,0,Math.PI * 2,0,Math.PI)
            const hand_arm = new THREE.CylinderGeometry(8,8,50,32,1,false,0)
            const hand_armFrame = new THREE.CylinderGeometry(14,12,30,6,1,false,0)
            const hand_elbow = new THREE.SphereGeometry(10,32,32,0,Math.PI * 2,0,Math.PI)
            const hand_elbowFrame = new THREE.CylinderGeometry(6,8,2,32,1,false,0)
            const hand_elbowFrame2 = new THREE.BoxGeometry(12,15,8)
            const hand_wrist = new THREE.CylinderGeometry(8,8,65,32,1,false,0)
            const hand_wristFrame = new THREE.CylinderGeometry(15,12,52,5,1,false,0)
            const hand_wristFrame2 = new THREE.CylinderGeometry(15,15,8,5,1,false,0)
            const hand_wristFrame3 = new THREE.CylinderGeometry(17,16,8,5,1,false,0)
            const hand_wristFrame4 = new THREE.CylinderGeometry(10,0,30,3,1,false,0)
            const hand_shoulderArmy = new THREE.BoxGeometry(38,33,33)
            const hand_shoulderArmyCut = new THREE.BoxGeometry(35,35,28)
            const hand_palmCenter = new THREE.BoxGeometry(8,18,20)
            const hand_fingerPartA = new THREE.CylinderBufferGeometry(2,2,10,6,1,false,0)
            const hand_fingerPartB = new THREE.CylinderBufferGeometry(2,2,8,6,1,false,0)
            const hand_fingerPartC = new THREE.CylinderBufferGeometry(2,2,5,6,1,false,0)
            const hand_plamFrame = new THREE.BoxGeometry(5,20,22)
            const hand_fingerMain = new THREE.CylinderBufferGeometry(3,3,12,6,1,false,0)
        // d.下腰部
        // --------------------------------------------------------------------------------
            const waist_corePartA = new THREE.CylinderGeometry(30,30,15,8,1,false,0)
            const waist_corePartB = new THREE.BoxGeometry(50,12,50)
            const waist_corePartC = new THREE.CylinderGeometry(5,5,40,32,1,false,0)
            const waist_corePartCut = new THREE.BoxGeometry(70,20,70)
            const waist_armorAPart1 = new THREE.BoxGeometry(20,40,6)
            const waist_armorAPart2 = new THREE.CylinderGeometry(12,12,30,3,1,false,0.25)
            const waist_armorAPart2a = new THREE.CylinderGeometry(12,12,30,3,1,false,-0.25)
            const waist_armorAPart3 = new THREE.CylinderGeometry(7,10,2,4,1,false,0)
            const waist_armorFrontPart1 = new THREE.CylinderGeometry(30,30,15,8,1,false,0)
            const waist_armorFrontPart2 = new THREE.BoxGeometry(20,60,40)
            const waist_armorFrontPart3 = new THREE.BoxGeometry(12,15,8)
            const waist_armorSide = new THREE.BoxGeometry(15,30,45)
        // e.背包
        // --------------------------------------------------------------------------------
            const ejector_corePartA = new THREE.BoxGeometry(55,40,20)
            const ejector_corePartB = new THREE.CylinderGeometry(20,20,12,8,1,false,0)
            const ejector_export = new THREE.CylinderGeometry(3,5,8,32,1,false,0)
            const ejector_scabbard = new THREE.CylinderGeometry(10,10,10,5,1,false,0)
            const ejector_swordPart1 = new THREE.CylinderGeometry(3,3,30,32,1,false,0)
            const ejector_swordPart2 = new THREE.CylinderGeometry(4.5,3,8,6,1,false,0)
            const ejector_swordPart3 = new THREE.CylinderGeometry(4.5,4.5,8,32,1,false,0)
        // f.腿
        // --------------------------------------------------------------------------------
            const thigh_corePartA = new THREE.SphereBufferGeometry(12,32,32)
            const thigh_corePartB = new THREE.CylinderGeometry(8,8,70,32,1,false,0)
            const calf_corePartB = new THREE.CylinderGeometry(8,8,130,32,1,false,0)
            const thigh_armorA = new THREE.CylinderGeometry(20,15,55,4,1,false,0)
            const calf_armorPartA = new THREE.BoxGeometry(30,115,80)
            const calf_armorPartACut = new THREE.CylinderGeometry(50,50,30,32,1,false,0)
            const calf_armorPartACutB = new THREE.BoxGeometry(30,30,40)
            const calf_armorPartB = new THREE.CylinderGeometry(22,30,12,6,1,false,0)
            const calf_armorPartC = new THREE.CylinderGeometry(12,20,30,4,1,false,Math.PI*0.25)
            const calf_armorPartCCut = new THREE.BoxGeometry(30,70,20)
            const calf_armorPartD = new THREE.CylinderGeometry(9,11,5,32,1,false,0)
            const calf_armorPartE1 = new THREE.BoxGeometry(15,40,5)
            const calf_armorPartF1 = new THREE.CylinderGeometry(12,18,18,64,1,false,0) 
            const calf_armorPartF2 = new THREE.BoxGeometry(5,5,20)
            const foot_corePartB = new THREE.CylinderGeometry(20,23,20,4,1,false,Math.PI*0.25)
            const foot_armorPartA = new THREE.CylinderGeometry(10,20,30,6,1,false,0)
            const foot_armorPartACut = new THREE.BoxGeometry(35,20,35)
            // 2.材質(顏色)
        // --------------------------------------------------------------------------------
            const Material = new THREE.MeshNormalMaterial({color:"rgb(255, 255, 255)"})
            const ML_firebrick = new THREE.MeshPhysicalMaterial({color:"rgb(178,34,34)"})
            const ML_black = new THREE.MeshPhysicalMaterial({color:"rgb(0,0,0)"})
            const ML_DimGrey = new THREE.MeshPhysicalMaterial({color:"rgb(105,105,105)"})
            const ML_Gold = new THREE.MeshPhysicalMaterial({color:"rgb(255,215,0)"})
            ML_mainColor = new THREE.MeshPhysicalMaterial({color:"rgb(255,255,235)"})
            ML_secondColor = new THREE.MeshPhysicalMaterial({color:"rgb(39,64,140)"})
            ML_lightingColor = new THREE.MeshPhysicalMaterial({color:"rgb(0,255,127)"})
            // const headMaterial = new THREE.MeshLambertMaterial({
            //     color:"rgb(150, 150, 150)",
            //     transparent:true,
            //     opacity:0.5
            // })

        // 3.部件定位
        // --------------------------------------------------------------------------------
        // a.頭部
            this.combine_antennaR = new THREE.Mesh(head_antenna,ML_mainColor)
            this.combine_antennaR.rotation.set(-0.2,0,-1)
            this.combine_antennaR.position.set(16,0,18)
            this.combine_antennaL = new THREE.Mesh(head_antenna,ML_mainColor)
            this.combine_antennaL.rotation.set(-0.2,0,1)
            this.combine_antennaL.position.set(-16,0,18)
            this.combine_coreTop = new THREE.Mesh(head_coreTop,ML_secondColor)
            this.combine_coreTop.rotation.set(1.6,1.589,0)
            this.combine_coreTop.position.set(0,-7,20)
            this.combine_coreBottom = new THREE.Mesh(head_coreBottom,ML_secondColor)
            this.combine_coreBottom.rotation.set(1.6,0,0)
            this.combine_coreBottom.position.set(0,-9.8,19.9)
            this.combine_cover = new THREE.Mesh(head_cover,ML_mainColor)
            this.combine_cover.rotation.set(-1.5,0.3,0)
            this.combine_cover.position.set(0,-15,0)
            this.combine_topModel = new THREE.Mesh(head_topModelGeometry,ML_mainColor)
            this.combine_topModel.position.set(-2.5,0,14)
            this.combine_afterHT = new THREE.Mesh(head_afterHT,ML_mainColor)
            this.combine_afterHT.position.set(0,5,4.5)
            this.combine_afterHT2 = new THREE.Mesh(head_afterHT2,ML_mainColor)
            this.combine_afterHT2.rotation.set(-2.2,0,0)
            this.combine_afterHT2.position.set(0,3.65,-7.8)
            this.combine_headBack = new THREE.Mesh(head_back,ML_mainColor)
            this.combine_headBack.rotation.set(0,1.6,0)
            this.combine_headBack.position.set(0,-18,-4)
            this.combine_LeftSideA = new THREE.Mesh(head_SideA,ML_mainColor)
            this.combine_LeftSideA.position.set(16,-18.1,0)
            this.combine_RightSideA = new THREE.Mesh(head_SideA,ML_mainColor)
            this.combine_RightSideA.position.set(-16,-18.1,0)
            this.combine_LeftSideB = new THREE.Mesh(head_SideB,ML_mainColor)
            this.combine_LeftSideB.rotation.set(1.8,-0.2,0.3)
            this.combine_LeftSideB.position.set(13,-24.2,10)
            this.combine_RightSideB = new THREE.Mesh(head_SideB,ML_mainColor)
            this.combine_RightSideB.rotation.set(1.8,3.35,0.3)
            this.combine_RightSideB.position.set(-13,-24.2,10)
            this.combine_LeftSideC = new THREE.Mesh(head_SideC,ML_mainColor)
            this.combine_LeftSideC.rotation.set(0,-0.5,0)
            this.combine_LeftSideC.position.set(15,-19,5)
            this.combine_RightSideC = new THREE.Mesh(head_SideC,ML_mainColor)
            this.combine_RightSideC.rotation.set(0,0.5,0)
            this.combine_RightSideC.position.set(-15,-19,5)
            this.combine_faceB = new THREE.Mesh(head_faceB,ML_firebrick)
            this.combine_faceB.rotation.set(0,-1.6,0)
            this.combine_faceB.position.set(0,-19.5,10)
            this.combine_faceC = new THREE.Mesh(head_faceC,ML_secondColor)
            this.combine_faceC.rotation.set(-0.4,0,0)
            this.combine_faceC.position.set(0,-35,17)
            this.combine_faceD = new THREE.Mesh(head_faceD,ML_firebrick)
            this.combine_faceD.rotation.set(-0.4,0,0)
            this.combine_faceD.position.set(0,-15,14)
            this.combine_insideLeft = new THREE.Mesh(head_inside,ML_black)
            this.combine_insideLeft.rotation.set(0.3,0.6,0)
            this.combine_insideLeft.position.set(5,-16,10.5)
            this.combine_insideRight = new THREE.Mesh(head_inside,ML_black)
            this.combine_insideRight.rotation.set(0.3,-0.6,0)
            this.combine_insideRight.position.set(-5,-16,10.5)
            this.combine_insideLeft2 = new THREE.Mesh(head_insideB,ML_firebrick)
            this.combine_insideLeft2.rotation.set(0.5,-0.2,-0.9)
            this.combine_insideLeft2.position.set(11.1,-19.2,7)
            this.combine_insideRight2 = new THREE.Mesh(head_insideB,ML_firebrick)
            this.combine_insideRight2.rotation.set(0.5,0.2,0.9)
            this.combine_insideRight2.position.set(-11,-19.2,7)
            this.combine_eyeLeft = new THREE.Mesh(head_eye,ML_lightingColor)
            this.combine_eyeLeft.rotation.set(0.3,1.9,-1.7)
            this.combine_eyeLeft.position.set(6,-12.8,13.5)
            this.combine_eyeRight = new THREE.Mesh(head_eye,ML_lightingColor)
            this.combine_eyeRight.rotation.set(0.3,1.2,-1.7)
            this.combine_eyeRight.position.set(-6,-12.8,13.5)
            this.combine_headLight = new THREE.Mesh(head_Light,ML_lightingColor)
            this.combine_headLight.position.set(0,5,16)
            this.combine_head_skyLine = new THREE.Mesh(head_skyLine,ML_mainColor)
            this.combine_head_skyLine.rotation.set(-0.5,0,0)
            this.combine_head_skyLine.position.set(8,10,-5)
            // 鬍鬚
            this.combine_beardA = new THREE.Mesh(head_beardMode)
            this.combine_beardA.rotation.set(0.3,0,0)
            this.combine_beardA.position.set(0,5,11.5)
            this.combine_beardB = new THREE.Mesh(head_beardMode2)
            this.combine_beardB.rotation.set(0.3,0,0)
            this.combine_beardB.position.set(-2,4.5,11.5)
            this.combine_beardC = new THREE.Mesh(head_beardMode2)
            this.combine_beardC.rotation.set(0.3,0,0)
            this.combine_beardC.position.set(2,4.5,11.5)
            this.combine_beardD = new THREE.Mesh(head_beardMode)
            this.combine_beardD.rotation.set(0.3,0,0)
            this.combine_beardD.position.set(0,3,10.5)
            this.combine_beardE = new THREE.Mesh(head_beardMode2)
            this.combine_beardE.rotation.set(0.3,0,0)
            this.combine_beardE.position.set(-2,2.5,10.5)
            this.combine_beardF = new THREE.Mesh(head_beardMode2)
            this.combine_beardF.rotation.set(0.3,0,0)
            this.combine_beardF.position.set(2,2.5,10.5)
            this.combine_faceA = new THREE.Mesh(head_faceA)
            this.combine_faceA.position.set(0,0,0)
            this.combine_faceA.rotation.set(0,-1.6,0)
            // 臉(合併)
            this.head_FaceBSP = new ThreeBSP(this.combine_faceA)
            this.head_BeardBSPA = new ThreeBSP(this.combine_beardA),this.head_BeardBSPB = new ThreeBSP(this.combine_beardB)
            this.head_BeardBSPC = new ThreeBSP(this.combine_beardC),this.head_BeardBSPD = new ThreeBSP(this.combine_beardD),
            this.head_BeardBSPE = new ThreeBSP(this.combine_beardE),this.head_BeardBSPF = new ThreeBSP(this.combine_beardF)
            this.head_faceResult = this.head_FaceBSP.subtract(this.head_BeardBSPA).subtract(this.head_BeardBSPB).subtract(this.head_BeardBSPC)
            .subtract(this.head_BeardBSPD).subtract(this.head_BeardBSPE).subtract(this.head_BeardBSPF)
            this.combine_faceResult = this.head_faceResult.toMesh(ML_mainColor)
            this.combine_faceResult.position.set(0,-28,10)
            // 部件打光
            this.light_eyeLeft = new THREE.PointLight({color:"rgb(0,255,127)"},5,10)
            this.light_eyeLeft.position.set(6,-14.5,14.5)
            this.light_eyeRight = new THREE.PointLight({color:"rgb(0,255,127)"},5,10)
            this.light_eyeRight.position.set(-6,-14.5,14.5)
            this.light_headLight = new THREE.PointLight({color:"rgb(0,255,127)"},2,12)
            this.light_headLight.position.set(0,5.5,20)
            this.light_eyeLeft.power = 0
            this.light_eyeRight.power = 0
            this.light_headLight.power = 0
            // 頭部合併
            this.head = new THREE.Group()
            this.head.add(this.combine_antennaR)
            this.head.add(this.combine_antennaL)
            this.head.add(this.combine_coreTop)
            this.head.add(this.combine_coreBottom)
            this.head.add(this.combine_cover)
            this.head.add(this.combine_topModel)
            this.head.add(this.combine_afterHT)
            this.head.add(this.combine_afterHT2)
            this.head.add(this.combine_headBack)
            this.head.add(this.combine_LeftSideA)
            this.head.add(this.combine_RightSideA)
            this.head.add(this.combine_LeftSideB)
            this.head.add(this.combine_RightSideB)
            this.head.add(this.combine_LeftSideC)
            this.head.add(this.combine_RightSideC)
            this.head.add(this.combine_faceB)
            this.head.add(this.combine_faceC)
            this.head.add(this.combine_faceD)
            this.head.add(this.combine_insideLeft)
            this.head.add(this.combine_insideRight)
            this.head.add(this.combine_insideLeft2)
            this.head.add(this.combine_insideRight2)
            this.head.add(this.combine_eyeLeft)
            this.head.add(this.light_eyeLeft)
            this.head.add(this.combine_eyeRight)
            this.head.add(this.light_eyeRight)
            this.head.add(this.combine_head_skyLine)
            this.head.add(this.combine_faceResult)
            this.head.add(this.combine_headLight)
            this.head.add(this.light_headLight)
            this.head.scale.set(0.9,0.9,0.9)
            this.head.position.set(0,60,-5)
        // b.身體
        // --------------------------------------------------------------------------------
            // 主體
            this.combine_body_core = new THREE.Mesh(body_core)
            this.combine_body_core.position.set(0,0,0)
            this.combine_body_coreCutA = new THREE.Mesh(body_coreCut)
            this.combine_body_coreCutA.rotation.set(-0.6,0,0)
            this.combine_body_coreCutA.position.set(0,15,38)
            this.combine_body_coreCutB = new THREE.Mesh(body_coreCut)
            this.combine_body_coreCutB.rotation.set(0.5,0,0)
            this.combine_body_coreCutB.position.set(0,-12,48)
            this.combine_body_coreCutC = new THREE.Mesh(body_coreCut)
            this.combine_body_coreCutC.rotation.set(-0.5,0,0)
            this.combine_body_coreCutC.position.set(0,-12,-48)
            // 身體核心切割
            this.body_coreBSP = new ThreeBSP(this.combine_body_core)
            this.body_coreCutBSPA = new ThreeBSP(this.combine_body_coreCutA)
            this.body_coreCutBSPB = new ThreeBSP(this.combine_body_coreCutB)
            this.body_coreCutBSPC = new ThreeBSP(this.combine_body_coreCutC)
            this.body_coreResult = this.body_coreBSP.subtract(this.body_coreCutBSPA).subtract(this.body_coreCutBSPB)
            .subtract(this.body_coreCutBSPC)
            this.combine_coreResult = this.body_coreResult.toMesh(ML_secondColor)
            this.combine_coreResult.position.set(0,0,0)
            // ----------------------------------------
            // 座艙
            this.combine_body_cabin = new THREE.Mesh(body_cabin)
            this.combine_body_cabin.rotation.set(0.5,0,0)
            this.combine_body_cabin.position.set(0,0,0)
            this.combine_body_cabinCut = new THREE.Mesh(body_cabinCut)
            this.combine_body_cabinCut.rotation.set(0.5,0,0)
            this.combine_body_cabinCut.position.set(0,-3,5)
            // 座艙切割
            this.body_cabinBSP = new ThreeBSP(this.combine_body_cabin)
            this.body_cabinCutBSP = new ThreeBSP(this.combine_body_cabinCut)
            this.body_cabinResult = this.body_cabinBSP.subtract(this.body_cabinCutBSP)
            this.combine_cabinResult = this.body_cabinResult.toMesh(ML_secondColor)
            this.combine_cabinResult.position.set(0,-25,34)
            // ----------------------------------------
            // 腰部
            this.combine_body_waistTop = new THREE.Mesh(body_waistTop,ML_mainColor)
            this.combine_body_waistTop.rotation.set(0,0.79,0)
            this.combine_body_waistTop.position.set(0,-25,0)
            this.combine_body_waistBottom = new THREE.Mesh(body_waistBottom,ML_mainColor)
            this.combine_body_waistBottom.rotation.set(0,0.79,0)
            this.combine_body_waistBottom.position.set(0,-40,0)
            // ----------------------------------------
            // 頸部
            this.combine_neck = new THREE.Mesh(body_neck,ML_DimGrey)
            this.combine_neck.position.set(0,30,-8)
            // ----------------------------------------
            // 裝飾物
            this.combine_body_decLeft = new THREE.Mesh(body_dec,ML_DimGrey)
            this.combine_body_decLeft.position.set(25,25,-2)
            this.combine_body_decRight = new THREE.Mesh(body_dec,ML_DimGrey)
            this.combine_body_decRight.position.set(-25,25,-2)
            this.combine_body_decBack = new THREE.Mesh(body_dec2,ML_DimGrey)
            this.combine_body_decBack.position.set(0,25,-27.5)
            this.combine_body_decChest = new THREE.Mesh(body_dec3,ML_Gold)
            this.combine_body_decChest.rotation.set(1,0,0)
            this.combine_body_decChest.position.set(0,14,28)
            // ----------------------------------------
            // 排氣口
            this.combine_body_chestAir = new THREE.Mesh(body_chestAir,ML_Gold)
            this.combine_body_chestAir.rotation.set(0,0,0)
            this.combine_body_chestAir.position.set(0,0,0)
            this.combine_body_chestBorderA = new THREE.Mesh(body_chestBorder,ML_Gold)
            this.combine_body_chestBorderA.rotation.set(0.2,0,0)
            this.combine_body_chestBorderA.position.set(0,3,2)
            this.combine_body_chestBorderB = new THREE.Mesh(body_chestBorder,ML_Gold)
            this.combine_body_chestBorderB.rotation.set(0.2,0,0)
            this.combine_body_chestBorderB.position.set(0,0,2)
            this.combine_body_chestBorderC = new THREE.Mesh(body_chestBorder,ML_Gold)
            this.combine_body_chestBorderC.rotation.set(0.2,0,0)
            this.combine_body_chestBorderC.position.set(0,-3,2)
            // 上半身零件組合
            this.combine_body_chestAirAllLeft = new THREE.Group()
            this.combine_body_chestAirAllLeft.add(this.combine_body_chestAir),this.combine_body_chestAirAllLeft.add(this.combine_body_chestBorderA),
            this.combine_body_chestAirAllLeft.add(this.combine_body_chestBorderB),this.combine_body_chestAirAllLeft.add(this.combine_body_chestBorderC)
            this.combine_body_chestAirAllLeft.rotation.set(0.5,0,0)
            this.combine_body_chestAirAllLeft.position.set(24,-13,36)
            this.combine_body_chestAirAllRight = this.combine_body_chestAirAllLeft.clone()
            this.combine_body_chestAirAllRight.rotation.set(0.5,0,0)
            this.combine_body_chestAirAllRight.position.set(-24,-13,36)
            // 下腰部
            // --------------------------------------------------
            this.combine_waist_corePartA = new THREE.Mesh(waist_corePartA)
            this.combine_waist_corePartA.rotation.set(0,0,Math.PI*0.5)
            this.combine_waist_corePartB = new THREE.Mesh(waist_corePartB)
            this.combine_waist_corePartB.position.set(0,6.5,0)
            this.combine_waist_corePartC = new THREE.Mesh(waist_corePartC)
            this.combine_waist_corePartC.rotation.set(0,0,Math.PI*0.5)
            this.combine_waist_corePartC.position.set(0,-15,0)
            this.combine_waist_corePartCut = new THREE.Mesh(waist_corePartCut)
            this.combine_waist_corePartCut.position.set(0,20,0)
            // 下腰部核心切割
            this.waist_corePartABSP = new ThreeBSP(this.combine_waist_corePartA)
            this.waist_corePartBBSP = new ThreeBSP(this.combine_waist_corePartB)
            this.waist_corePartCBSP = new ThreeBSP(this.combine_waist_corePartC)
            this.waist_corePartCutBSP = new ThreeBSP(this.combine_waist_corePartCut)
            this.waist_coreResult = this.waist_corePartABSP.subtract(this.waist_corePartCutBSP).union(this.waist_corePartBBSP).union(this.waist_corePartCBSP)
            this.combine_waist_coreResult = this.waist_coreResult.toMesh(ML_DimGrey)
            // 腰裙甲
            // 左A
            this.waist_armorAl1 = new THREE.Mesh(waist_armorAPart1)
            this.waist_armorAl2 = new THREE.Mesh(waist_armorAPart2)
            this.waist_armorAl2.rotation.set(Math.PI,0,Math.PI*0.4)
            this.waist_armorAl2.position.set(0,-20,2)
            this.waist_armorAl3 = new THREE.Mesh(waist_armorAPart3)
            this.waist_armorAl3.rotation.set(Math.PI*0.5,Math.PI*0.25,0)
            this.waist_armorAl3.position.set(0,10,4)
            this.waist_armorAl1BSP = new ThreeBSP(this.waist_armorAl1)
            this.waist_armorAl2BSP = new ThreeBSP(this.waist_armorAl2)
            this.waist_armorAl3BSP = new ThreeBSP(this.waist_armorAl3)
            this.waist_armorAResult_left = this.waist_armorAl1BSP.subtract(this.waist_armorAl2BSP).union(this.waist_armorAl3BSP)
            this.combine_waistAResult_left = this.waist_armorAResult_left.toMesh(ML_mainColor)
            this.combine_waistAResult_left.position.y = -14
            this.combine_waistALeft = new THREE.Group()
            this.combine_waistALeft.add(this.combine_waistAResult_left)
            this.combine_waistALeft.scale.set(1.3,1.3,1)
            // 右B & 位置
            this.combine_waistBRight = this.combine_waistALeft.clone()
            this.combine_waistBRight.position.set(-23,-2,-30)
            this.combine_waistBRight.rotation.set(0,Math.PI*1,0)
            // 左A位置
            this.combine_waistALeft.position.set(23,-2,30)
            // 右A
            this.waist_armorAR1 = new THREE.Mesh(waist_armorAPart1)
            this.waist_armorAR2 = new THREE.Mesh(waist_armorAPart2a)
            this.waist_armorAR2.rotation.set(Math.PI,0,-Math.PI*0.4)
            this.waist_armorAR2.position.set(0,-20,2)
            this.waist_armorAR3 = new THREE.Mesh(waist_armorAPart3)
            this.waist_armorAR3.rotation.set(Math.PI*0.5,Math.PI*0.25,0)
            this.waist_armorAR3.position.set(0,10,4)
            this.waist_armorAR1BSP = new ThreeBSP(this.waist_armorAR1)
            this.waist_armorAR2BSP = new ThreeBSP(this.waist_armorAR2)
            this.waist_armorAR3BSP = new ThreeBSP(this.waist_armorAR3)
            this.waist_armorAResult_Right = this.waist_armorAR1BSP.subtract(this.waist_armorAR2BSP).union(this.waist_armorAR3BSP)
            this.combine_waistAResult_Right = this.waist_armorAResult_Right.toMesh(ML_mainColor)
            this.combine_waistAResult_Right.position.y = -14
            this.combine_waistARight = new THREE.Group()
            this.combine_waistARight.add(this.combine_waistAResult_Right)
            this.combine_waistARight.scale.set(1.3,1.3,1)
            // 左B & 位置
            this.combine_waistBLight = this.combine_waistARight.clone()
            this.combine_waistBLight.position.set(23,-2,-30)
            this.combine_waistBLight.rotation.set(0,Math.PI*1,0)
            // 右A位置
            this.combine_waistARight.position.set(-23,-2,30)
            // 前群甲
            this.combine_waist_armorFrontPart1 = new THREE.Mesh(waist_armorFrontPart1)
            this.combine_waist_armorFrontPart1.rotation.set(0,0,Math.PI*0.5)
            this.combine_waist_armorFrontPart2 = new THREE.Mesh(waist_armorFrontPart2)
            this.combine_waist_armorFrontPart2.position.set(0,0,-10)
            this.waist_armorFrontPart1BSP = new ThreeBSP(this.combine_waist_armorFrontPart1)
            this.waist_armorFrontPart2BSP = new ThreeBSP(this.combine_waist_armorFrontPart2)
            this.waist_armorFrontResult = this.waist_armorFrontPart1BSP.subtract(this.waist_armorFrontPart2BSP)
            this.combine_waistarmorFront = this.waist_armorFrontResult.toMesh(ML_mainColor)
            this.combine_waistarmorBack = this.combine_waistarmorFront.clone()
            this.combine_waistarmorBack.rotation.set(0,Math.PI*1,Math.PI*0.5)
            this.combine_waistarmorBack.position.set(0,-18,-18)
            this.combine_waist_armorFrontPart3 = new THREE.Mesh(waist_armorFrontPart3,ML_secondColor)
            this.combine_waist_armorFrontPart3.position.set(0,10,25)
            this.combine_waist_armorFrontPart3.rotation.set(-Math.PI*0.13,0,0)
            this.combine_waistarmorFrontAll = new THREE.Group()
            this.combine_waistarmorFrontAll.add(this.combine_waistarmorFront)
            this.combine_waistarmorFrontAll.add(this.combine_waist_armorFrontPart3)
            this.combine_waistarmorFrontAll.position.set(0,-18,20)
            // 側裙甲
            this.combine_waist_armorSideA = new THREE.Mesh(waist_armorSide,ML_mainColor)
            this.combine_waist_armorSideB = this.combine_waist_armorSideA.clone()
            this.combine_waist_armorSideB.scale.set(0.5,0.5,0.5)
            this.combine_waist_armorSideB.position.set(6,3,0)
            this.combine_waist_armorSideAllLeft = new THREE.Group()
            this.combine_waist_armorSideAllLeft.add(this.combine_waist_armorSideA)
            this.combine_waist_armorSideAllLeft.add(this.combine_waist_armorSideB)
            this.combine_waist_armorSideAllRight = this.combine_waist_armorSideAllLeft.clone()
            this.combine_waist_armorSideAllLeft.position.set(38,-10,0)
            this.combine_waist_armorSideAllRight.rotation.set(0,Math.PI*1,0)
            this.combine_waist_armorSideAllRight.position.set(-38,-10,0)
            // 所有裙甲組裝
            this.combine_waist_coreAll = new THREE.Group()
            this.combine_waist_coreAll.add(this.combine_waist_coreResult)
            this.combine_waist_coreAll.add(this.combine_waistALeft)
            this.combine_waist_coreAll.add(this.combine_waistARight)
            this.combine_waist_coreAll.add(this.combine_waistBLight)
            this.combine_waist_coreAll.add(this.combine_waistBRight)
            this.combine_waist_coreAll.add(this.combine_waistarmorBack)
            this.combine_waist_coreAll.add(this.combine_waistarmorFrontAll)
            this.combine_waist_coreAll.add(this.combine_waist_armorSideAllLeft)
            this.combine_waist_coreAll.add(this.combine_waist_armorSideAllRight)
            this.combine_waist_coreAll.position.set(0,-60,0)
            // 身體組合
            this.body = new THREE.Group()
            this.body.add(this.combine_coreResult)
            this.body.add(this.combine_cabinResult)
            this.body.add(this.combine_body_waistTop)
            this.body.add(this.combine_body_waistBottom)
            this.body.add(this.combine_neck)
            this.body.add(this.combine_body_decLeft)
            this.body.add(this.combine_body_decRight)
            this.body.add(this.combine_body_decBack)
            this.body.add(this.combine_body_decChest)
            this.body.add(this.combine_body_chestAirAllLeft)
            this.body.add(this.combine_body_chestAirAllRight)
            this.body.add(this.combine_waist_coreAll)
        // c.手臂
        // --------------------------------------------------------------------------------
            // 肩胛
            this.combine_hand_shoulder = new THREE.Mesh(hand_shoulder,ML_DimGrey)
            // 二頭肌
            this.combine_hand_arm = new THREE.Mesh(hand_arm,ML_DimGrey)
            this.combine_hand_armFrame = new THREE.Mesh(hand_armFrame,ML_mainColor)
            this.combine_hand_armFrame.position.set(0,-2,0)
            this.combine_hand_armAll = new THREE.Group()
            this.combine_hand_armAll.add(this.combine_hand_arm)
            this.combine_hand_armAll.add(this.combine_hand_armFrame)
            this.combine_hand_armAll.position.set(0,-30,0)
            this.combine_hand_armAllRight = this.combine_hand_armAll.clone()
            // 手肘
            this.combine_hand_elbow = new THREE.Mesh(hand_elbow,ML_DimGrey)
            this.combine_hand_elbowFrameA = new THREE.Mesh(hand_elbowFrame,ML_mainColor)
            this.combine_hand_elbowFrameA.rotation.set(1.6,0,1.6)
            this.combine_hand_elbowFrameA.position.set(-10,0,0)
            this.combine_hand_elbowFrameB = new THREE.Mesh(hand_elbowFrame,ML_mainColor)
            this.combine_hand_elbowFrameB.rotation.set(1.6,0,-1.6)
            this.combine_hand_elbowFrameB.position.set(10,0,0)
            this.combine_hand_elbowFrameC = new THREE.Mesh(hand_elbowFrame2,ML_mainColor)
            this.combine_hand_elbowFrameC.position.set(0,0,-10)
            this.combine_hand_elbowAll = new THREE.Group()
            this.combine_hand_elbowAll.add(this.combine_hand_elbow)
            this.combine_hand_elbowAll.add(this.combine_hand_elbowFrameA)
            this.combine_hand_elbowAll.add(this.combine_hand_elbowFrameB)
            this.combine_hand_elbowAll.add(this.combine_hand_elbowFrameC)
            this.combine_hand_elbowAllRight = this.combine_hand_elbowAll.clone()
            // 手腕
            this.combine_hand_wrist = new THREE.Mesh(hand_wrist,ML_DimGrey)
            this.combine_hand_wrist.position.set(0,-37,0)
            this.combine_hand_wristFrame = new THREE.Mesh(hand_wristFrame,ML_mainColor)
            this.combine_hand_wristFrame.rotation.set(0,0.7,0)
            this.combine_hand_wristFrame.position.set(0,-37,0)
            this.combine_hand_wristFrame2 = new THREE.Mesh(hand_wristFrame2,ML_mainColor)
            this.combine_hand_wristFrame2.rotation.set(0,0.7,0)
            this.combine_hand_wristFrame2.position.set(0,-60,0)
            this.combine_hand_wristFrame3 = new THREE.Mesh(hand_wristFrame3,ML_mainColor)
            this.combine_hand_wristFrame3.rotation.set(0,0.7,0)
            this.combine_hand_wristFrame3.position.set(0,-15,0)
            this.combine_hand_wristFrame4 = new THREE.Mesh(hand_wristFrame4,ML_mainColor)
            this.combine_hand_wristFrame4.rotation.set(0,1,0)
            this.combine_hand_wristFrame4.position.set(0,-26.5,-12)
            this.combine_hand_wristAllLeft = new THREE.Group()
            this.combine_hand_wristAllLeft.add(this.combine_hand_wrist)
            this.combine_hand_wristAllLeft.add(this.combine_hand_wristFrame)
            this.combine_hand_wristAllLeft.add(this.combine_hand_wristFrame2)
            this.combine_hand_wristAllLeft.add(this.combine_hand_wristFrame3)
            this.combine_hand_wristAllLeft.add(this.combine_hand_wristFrame4)
            this.combine_hand_wristAllRight = this.combine_hand_wristAllLeft.clone()
            this.combine_hand_wristAllLeft.add(this.combine_hand_elbowAll)
            this.combine_hand_wristAllRight.add(this.combine_hand_elbowAllRight)
            // 手掌(左)
            this.combine_hand_palmCenterLeft = new THREE.Mesh(hand_palmCenter,ML_DimGrey)
            this.combine_hand_plamFrame_Left = new THREE.Mesh(hand_plamFrame,ML_secondColor)
            this.combine_hand_plamFrame_Left.position.set(5,0,0)
            this.combine_hand_plamAll_left = new THREE.Group()
            // 手指
            this.combine_hand_fingerPartA = new THREE.Mesh(hand_fingerPartA,ML_DimGrey)
            this.combine_hand_fingerPartB = new THREE.Mesh(hand_fingerPartB,ML_DimGrey)
            this.combine_hand_fingerPartB.rotation.set(0,0,-Math.PI*0.5)
            this.combine_hand_fingerPartB.position.set(-3,-4,0)
            this.combine_hand_fingerPartC = new THREE.Mesh(hand_fingerPartC,ML_DimGrey)
            this.combine_hand_fingerPartC.position.set(-6,-1.5,0)
            this.combine_hand_fingerAll_left = new THREE.Group()
            this.combine_hand_fingerAll_left.add(this.combine_hand_fingerPartA)
            this.combine_hand_fingerAll_left.add(this.combine_hand_fingerPartB)
            this.combine_hand_fingerAll_left.add(this.combine_hand_fingerPartC)
            this.combine_hand_fingerAll_left.rotation.set(0,0,-Math.PI*0.25)
            this.combine_hand_fingerAll_left2 = this.combine_hand_fingerAll_left.clone()
            this.combine_hand_fingerAll_left3 = this.combine_hand_fingerAll_left.clone()
            this.combine_hand_fingerAll_left4 = this.combine_hand_fingerAll_left.clone()
            // 拇指
            this.combine_hand_fingerMainA = new THREE.Mesh(hand_fingerMain,ML_DimGrey)
            this.combine_hand_fingerMainB = new THREE.Mesh(hand_fingerMain,ML_DimGrey)
            this.combine_hand_fingerMainB.rotation.set(Math.PI*0.5,0,0)
            this.combine_hand_fingerMainB.position.set(0,-5,-5)
            this.combine_hand_fingerMainAll_Left = new THREE.Group()
            this.combine_hand_fingerMainAll_Left.add(this.combine_hand_fingerMainA)
            this.combine_hand_fingerMainAll_Left.add(this.combine_hand_fingerMainB)
            // ---------------------------------------------------------------------------
            this.combine_hand_plamAll_left.add(this.combine_hand_palmCenterLeft)
            this.combine_hand_plamAll_left.add(this.combine_hand_plamFrame_Left)
            this.combine_hand_plamAll_left.add(this.combine_hand_fingerAll_left)
            this.combine_hand_plamAll_left.add(this.combine_hand_fingerAll_left2)
            this.combine_hand_plamAll_left.add(this.combine_hand_fingerAll_left3)
            this.combine_hand_plamAll_left.add(this.combine_hand_fingerAll_left4)
            this.combine_hand_plamAll_left.add(this.combine_hand_fingerMainAll_Left)
            this.combine_hand_wristAllLeft.add(this.combine_hand_plamAll_left)
            this.combine_hand_plamAll_left.position.set(0,-80,0)
            // ---------------------------------------------------------------------------
            // 手掌(右)
            this.combine_hand_palmCenterRight = new THREE.Mesh(hand_palmCenter,ML_DimGrey)
            this.combine_hand_plamFrame_Right = new THREE.Mesh(hand_plamFrame,ML_secondColor)
            this.combine_hand_plamFrame_Right.position.set(-5,0,0)
            this.combine_hand_plamAll_Right = new THREE.Group()
            // 手指
            this.combine_hand_fingerPartD = new THREE.Mesh(hand_fingerPartA,ML_DimGrey)
            this.combine_hand_fingerPartE = new THREE.Mesh(hand_fingerPartB,ML_DimGrey)
            this.combine_hand_fingerPartE.rotation.set(0,0,Math.PI*0.5)
            this.combine_hand_fingerPartE.position.set(3,-4,0)
            this.combine_hand_fingerPartF = new THREE.Mesh(hand_fingerPartC,ML_DimGrey)
            this.combine_hand_fingerPartF.position.set(6,-1.5,0)
            this.combine_hand_fingerAll_Right = new THREE.Group()
            this.combine_hand_fingerAll_Right.add(this.combine_hand_fingerPartD)
            this.combine_hand_fingerAll_Right.add(this.combine_hand_fingerPartE)
            this.combine_hand_fingerAll_Right.add(this.combine_hand_fingerPartF)
            this.combine_hand_fingerAll_Right.rotation.set(0,0,Math.PI*0.25)
            this.combine_hand_fingerAll_Right2 = this.combine_hand_fingerAll_Right.clone()
            this.combine_hand_fingerAll_Right3 = this.combine_hand_fingerAll_Right.clone()
            this.combine_hand_fingerAll_Right4 = this.combine_hand_fingerAll_Right.clone()
            // 拇指
            this.combine_hand_fingerMainC = new THREE.Mesh(hand_fingerMain,ML_DimGrey)
            this.combine_hand_fingerMainD = new THREE.Mesh(hand_fingerMain,ML_DimGrey)
            this.combine_hand_fingerMainD.rotation.set(Math.PI*0.5,0,0)
            this.combine_hand_fingerMainD.position.set(0,-5,-5)
            this.combine_hand_fingerMainAll_Right = new THREE.Group()
            this.combine_hand_fingerMainAll_Right.add(this.combine_hand_fingerMainC)
            this.combine_hand_fingerMainAll_Right.add(this.combine_hand_fingerMainD)
            this.combine_hand_plamAll_Right.position.set(0,-80,0)
            // ---------------------------------------------------------------------------
            this.combine_hand_plamAll_Right.add(this.combine_hand_palmCenterRight)
            this.combine_hand_plamAll_Right.add(this.combine_hand_plamFrame_Right)
            this.combine_hand_plamAll_Right.add(this.combine_hand_fingerAll_Right)
            this.combine_hand_plamAll_Right.add(this.combine_hand_fingerAll_Right2)
            this.combine_hand_plamAll_Right.add(this.combine_hand_fingerAll_Right3)
            this.combine_hand_plamAll_Right.add(this.combine_hand_fingerAll_Right4)
            this.combine_hand_plamAll_Right.add(this.combine_hand_fingerMainAll_Right)
            this.combine_hand_wristAllRight.add(this.combine_hand_plamAll_Right)
            // ---------------------------------------------------------------------------
            // 左右手腕
            this.combine_hand_wristAllLeft.position.set(0,-25,0)
            this.combine_hand_wristAllRight.position.set(0,-25,0)
            // ----------------------------------------------------------------
            // 肩膀盔甲
            this.combine_hand_shoulderArmy = new THREE.Mesh(hand_shoulderArmy)
            this.combine_hand_shoulderArmyCutCenter = new THREE.Mesh(hand_shoulderArmyCut)
            this.combine_hand_shoulderArmyCutCenter.position.set(4,-4,0)
            this.combine_hand_shoulderArmyCut = new THREE.Mesh(hand_shoulderArmy)
            this.combine_hand_shoulderArmyCut.rotation.set(0,0,0.8)
            this.combine_hand_shoulderArmyCut.position.set(27,-17,0)
            this.combine_hand_shoulderArmy = new THREE.Mesh(hand_shoulderArmy)
            // 肩膀盔甲切割
            this.hand_shoulderArmyBSP = new ThreeBSP(this.combine_hand_shoulderArmy)
            this.hand_shoulderArmyCutBSP = new ThreeBSP(this.combine_hand_shoulderArmyCut)
            this.hand_shoulderArmyCutCenterBSP = new ThreeBSP(this.combine_hand_shoulderArmyCutCenter)
            this.hand_shoulderArmyResult = this.hand_shoulderArmyBSP.subtract(this.hand_shoulderArmyCutBSP)
            .subtract(this.hand_shoulderArmyCutCenterBSP)
            this.combine_shoulderArmyResultLeft = this.hand_shoulderArmyResult.toMesh(ML_secondColor)
            this.combine_shoulderArmyResultRight = this.combine_shoulderArmyResultLeft.clone()
            this.combine_shoulderArmyResultLeft.position.set(0,4,0)
            this.combine_shoulderArmyResultRight.position.set(0,4,0)
            this.combine_shoulderArmyResultRight.rotation.set(0,Math.PI*1,0)
            // 手臂組合
            this.handLeft = new THREE.Group()
            this.handLeft.add(this.combine_hand_shoulder)
            this.handRight = this.handLeft.clone()
            // 個別組合物件
            this.combine_hand_armAll.add(this.combine_hand_wristAllLeft)
            this.combine_hand_armAllRight.add(this.combine_hand_wristAllRight)
            this.handLeft.add(this.combine_shoulderArmyResultLeft)
            this.handLeft.add(this.combine_hand_armAll)
            this.handRight.add(this.combine_shoulderArmyResultRight)
            this.handRight.add(this.combine_hand_armAllRight)
        
        // d.背包
        // --------------------------------------------------------------------------------
            this.combine_ejector_corePartA = new THREE.Mesh(ejector_corePartA)
            this.combine_ejector_corePartB = new THREE.Mesh(ejector_corePartB)
            this.combine_ejector_corePartB.rotation.set(-Math.PI*0.5,0,Math.PI*0.5)
            this.combine_ejector_corePartC = this.combine_ejector_corePartB.clone()
            this.combine_ejector_corePartB.position.set(15,-10,-3)
            this.combine_ejector_corePartC.position.set(-15,-10,-3)
            this.ejector_corePartABSP = new ThreeBSP(this.combine_ejector_corePartA)
            this.ejector_corePartBBSP = new ThreeBSP(this.combine_ejector_corePartB)
            this.ejector_corePartCBSP = new ThreeBSP(this.combine_ejector_corePartC)
            this.ejector_coreResult = this.ejector_corePartABSP.union(this.ejector_corePartBBSP).union(this.ejector_corePartCBSP)
            this.combine_ejector_coreResult = this.ejector_coreResult.toMesh(ML_DimGrey)
            this.combine_ejector_coreResult.position.set(0,0,0)
            
            this.combine_ejector_export = new THREE.Mesh(ejector_export)
            this.combine_ejector_exportCut = this.combine_ejector_export.clone()
            this.combine_ejector_exportCut.scale.set(0.8,0.8,0.8)
            this.combine_ejector_exportCut.position.set(0,-2,0)
            this.ejector_exportBSP = new ThreeBSP(this.combine_ejector_export)
            this.ejector_exportCutBSP = new ThreeBSP(this.combine_ejector_exportCut)
            this.ejector_exportResult = this.ejector_exportBSP.subtract(this.ejector_exportCutBSP)
            this.combine_ejector_exportA = this.ejector_exportResult.toMesh(ML_DimGrey)
            this.combine_ejector_exportA.rotation.set(Math.PI*0.15,0,0)
            this.combine_ejector_exportB = this.combine_ejector_exportA.clone()
            this.combine_ejector_exportB.position.set(-15,-29,-11)
            this.combine_ejector_exportA.position.set(15,-29,-11)
            this.combine_ejector_scabbardA = new THREE.Mesh(ejector_scabbard,ML_DimGrey)
            this.combine_ejector_scabbardA.rotation.set(-Math.PI*0.5,0,0)
            this.combine_ejector_scabbardB = this.combine_ejector_scabbardA.clone()
            this.combine_ejector_scabbardA.position.set(27,8,-2)
            this.combine_ejector_scabbardB.position.set(-27,8,-2)

            this.combine_ejector_swordPart1 = new THREE.Mesh(ejector_swordPart1,ML_mainColor)
            this.combine_ejector_swordPart2 = new THREE.Mesh(ejector_swordPart2,ML_mainColor)
            this.combine_ejector_swordPart3 = new THREE.Mesh(ejector_swordPart3,ML_mainColor)
            this.combine_ejector_swordPart2.position.set(0,-18,0)
            this.combine_ejector_swordPart3.position.set(0,18,0)
            this.combine_ejector_swordAllA = new THREE.Group()
            this.combine_ejector_swordAllA.add(this.combine_ejector_swordPart1)
            this.combine_ejector_swordAllA.add(this.combine_ejector_swordPart2)
            this.combine_ejector_swordAllA.add(this.combine_ejector_swordPart3)
            this.combine_ejector_swordAllB = this.combine_ejector_swordAllA.clone()
            this.combine_ejector_swordAllA.rotation.set(0,0,Math.PI*0.9)
            this.combine_ejector_swordAllA.position.set(38,34,0)
            this.combine_ejector_swordAllB.rotation.set(0,0,-Math.PI*0.9)
            this.combine_ejector_swordAllB.position.set(-38,34,0)

            this.ejectorAll = new THREE.Group()
            this.ejectorAll.add(this.combine_ejector_coreResult)
            this.ejectorAll.add(this.combine_ejector_exportA)
            this.ejectorAll.add(this.combine_ejector_exportB)
            this.ejectorAll.add(this.combine_ejector_scabbardA)
            this.ejectorAll.add(this.combine_ejector_scabbardB)
            this.ejectorAll.add(this.combine_ejector_swordAllA)
            this.ejectorAll.add(this.combine_ejector_swordAllB)
            this.ejectorAll.position.set(0,-5,-45)

        // e.腿
        // --------------------------------------------------------------------------------
            // 大腿
            this.combine_thigh_corePartA = new THREE.Mesh(thigh_corePartA,ML_DimGrey)
            this.combine_thigh_corePartB = new THREE.Mesh(thigh_corePartB,ML_DimGrey)
            this.combine_thigh_corePartB.position.set(0,-40,0)
            // 裝甲
            this.combine_thigh_armorA = new THREE.Mesh(thigh_armorA,ML_mainColor)
            this.combine_thigh_armorA.rotation.set(0,Math.PI*0.25,0)
            this.combine_thigh_armorA.position.set(0,-40,0)
            this.thighAll = new THREE.Group()
            this.thighAll.add(this.combine_thigh_corePartA)
            this.thighAll.add(this.combine_thigh_corePartB)
            this.thighAll.add(this.combine_thigh_armorA)
            // 右腳部分
            this.thighAllRight = this.thighAll.clone()
            // 小腿
            this.combine_calf_corePartA = this.combine_thigh_corePartA.clone()
            this.combine_calf_corePartB = new THREE.Mesh(calf_corePartB,ML_DimGrey)
            this.combine_calf_corePartB.position.set(0,-70,0)
            this.calfAll = new THREE.Group()
            this.calfAll.add(this.combine_calf_corePartA)
            this.calfAll.add(this.combine_calf_corePartB)
            this.calfAll.position.set(0,-80,0)
            // 裝甲A
            this.combine_calf_armorPartA = new THREE.Mesh(calf_armorPartA)
            this.combine_calf_armorPartACut1 = new THREE.Mesh(calf_armorPartACut)
            this.combine_calf_armorPartACut1.scale.set(1.8,1,1)
            this.combine_calf_armorPartACut2 = this.combine_calf_armorPartACut1.clone()
            this.combine_calf_armorPartACut1.rotation.set(-Math.PI*0.1,0,Math.PI*0.5)
            this.combine_calf_armorPartACut1.position.set(0,0,75)
            this.combine_calf_armorPartACut2.rotation.set(Math.PI*0.15,0,Math.PI*0.5)
            this.combine_calf_armorPartACut2.position.set(0,5,-70)
            this.combine_calf_armorPartACutB = new THREE.Mesh(calf_armorPartACutB)
            this.combine_calf_armorPartACutB.rotation.set(Math.PI*0.4,0,0)
            this.combine_calf_armorPartACutB.position.set(0,-50,-42)
            this.calf_armorPartABSP = new ThreeBSP(this.combine_calf_armorPartA)
            this.calf_armorPartACut1BSP = new ThreeBSP(this.combine_calf_armorPartACut1)
            this.calf_armorPartACut2BSP = new ThreeBSP(this.combine_calf_armorPartACut2)
            this.calf_armorPartACutBBSP = new ThreeBSP(this.combine_calf_armorPartACutB)
            this.calf_armorPartAResult = this.calf_armorPartABSP.subtract(this.calf_armorPartACut1BSP)
            .subtract(this.calf_armorPartACut2BSP).subtract(this.calf_armorPartACutBBSP)
            this.combine_calf_armorPartAResult = this.calf_armorPartAResult.toMesh(ML_mainColor)
            this.combine_calf_armorPartAResult.position.set(0,-70,0)
            // 裝甲B
            this.combine_calf_armorPartB = new THREE.Mesh(calf_armorPartB,ML_mainColor)
            this.combine_calf_armorPartB.scale.set(1.3,1,0.9)
            this.combine_calf_armorPartB2 = this.combine_calf_armorPartB.clone()
            this.combine_calf_armorPartB.rotation.set(0,0,-Math.PI*0.5)
            this.combine_calf_armorPartB.position.set(21,-45,0)
            this.combine_calf_armorPartB2.rotation.set(0,0,Math.PI*0.5)
            this.combine_calf_armorPartB2.position.set(-21,-45,0)
            this.calfAll.add(this.combine_calf_armorPartB)
            this.calfAll.add(this.combine_calf_armorPartB2)
            this.calfAll.add(this.combine_calf_armorPartAResult)
            // 裝甲C
            this.combine_calf_armorPartC = new THREE.Mesh(calf_armorPartC)
            this.combine_calf_armorPartC2 = this.combine_calf_armorPartC.clone()
            this.combine_calf_armorPartCCut = new THREE.Mesh(calf_armorPartCCut)
            this.combine_calf_armorPartC2.rotation.set(0,0,Math.PI*1)
            this.combine_calf_armorPartC2.position.set(0,-30,0)
            this.combine_calf_armorPartCCut.rotation.set(Math.PI*0.05,0,0)
            this.combine_calf_armorPartCCut.position.set(0,-15,-10)
            this.calf_armorPartCBSP = new ThreeBSP(this.combine_calf_armorPartC)
            this.calf_armorPartC2BSP = new ThreeBSP(this.combine_calf_armorPartC2)
            this.calf_armorPartCCutBSP = new ThreeBSP(this.combine_calf_armorPartCCut)
            this.calf_armorPartCResult = this.calf_armorPartCBSP.union(this.calf_armorPartC2BSP).subtract(this.calf_armorPartCCutBSP)
            this.combine_calf_armorPartCResult = this.calf_armorPartCResult.toMesh(ML_mainColor)
            this.combine_calf_armorPartCResult.position.set(0,0,20)
            this.calfAll.add(this.combine_calf_armorPartCResult)
            // 裝甲D
            this.combine_calf_armorPartD = new THREE.Mesh(calf_armorPartD,ML_mainColor)
            this.combine_calf_armorPartD2 = this.combine_calf_armorPartD.clone()
            this.combine_calf_armorPartD.rotation.set(0,Math.PI*1,Math.PI*0.5)
            this.combine_calf_armorPartD.position.set(12,0,0)
            this.combine_calf_armorPartD2.rotation.set(0,0,Math.PI*0.5)
            this.combine_calf_armorPartD2.position.set(-12,0,0)
            this.calfAll.add(this.combine_calf_armorPartD)
            this.calfAll.add(this.combine_calf_armorPartD2)
            // 裝甲E
            this.combine_calf_armorPartE1 = new THREE.Mesh(calf_armorPartE1)
            this.combine_calf_armorPartE2 = this.combine_calf_armorPartE1.clone()
            this.combine_calf_armorPartE3 = this.combine_calf_armorPartE1.clone()
            this.combine_calf_armorPartE1.rotation.set(-Math.PI*0.075,0,Math.PI*0.5)
            this.combine_calf_armorPartE2.rotation.set(-Math.PI*0.075,Math.PI*0.5,Math.PI*0.5)
            this.combine_calf_armorPartE2.position.set(22.5,-4,-17)
            this.combine_calf_armorPartE3.rotation.set(-Math.PI*0.075,Math.PI*0.5,Math.PI*0.5)
            this.combine_calf_armorPartE3.position.set(-22.5,-4,-17)
            this.calf_armorPartE1BSP = new ThreeBSP(this.combine_calf_armorPartE1)
            this.calf_armorPartE2BSP = new ThreeBSP(this.combine_calf_armorPartE2)
            this.calf_armorPartE3BSP = new ThreeBSP(this.combine_calf_armorPartE3)
            this.calf_armorPartEResult = this.calf_armorPartE1BSP.union(this.calf_armorPartE2BSP)
            .union(this.calf_armorPartE3BSP)
            this.combine_calf_armorPartEResult = this.calf_armorPartEResult.toMesh(ML_mainColor)
            this.combine_calf_armorPartEResult.position.set(0,-110,45)
            this.calfAll.add(this.combine_calf_armorPartEResult)
            // 裝甲F
            this.combine_calf_armorPartF1 = new THREE.Mesh(calf_armorPartF1)
            this.combine_calf_armorPartFCut = this.combine_calf_armorPartF1.clone()
            this.combine_calf_armorPartF2 = new THREE.Mesh(calf_armorPartF2)
            this.combine_calf_armorPartF2.position.set(0,0,0)
            this.combine_calf_armorPartFCut.scale.set(0.7,0.7,0.7)
            this.combine_calf_armorPartFCut.position.set(0,4,0)
            this.calf_armorPartF1BSP = new ThreeBSP(this.combine_calf_armorPartF1)
            this.calf_armorPartF2BSP = new ThreeBSP(this.combine_calf_armorPartF2)
            this.calf_armorPartFCutBSP = new ThreeBSP(this.combine_calf_armorPartFCut)
            this.calf_armorPartFResult = this.calf_armorPartF1BSP.subtract(this.calf_armorPartFCutBSP).union(this.calf_armorPartF2BSP)
            this.combine_calf_armorPartFResultA = this.calf_armorPartFResult.toMesh(ML_mainColor)
            this.combine_calf_armorPartFResultB = this.combine_calf_armorPartFResultA.clone()
            this.combine_calf_armorPartFResultA.rotation.set(0,0,-Math.PI*0.5)
            this.combine_calf_armorPartFResultA.position.set(24,-120,-5)
            this.combine_calf_armorPartFResultB.rotation.set(0,0,Math.PI*0.5)
            this.combine_calf_armorPartFResultB.position.set(-24,-120,-5)
            this.calfAll.add(this.combine_calf_armorPartFResultA)
            this.calfAll.add(this.combine_calf_armorPartFResultB)
            // 右腳部分
            this.calfAllRight = this.calfAll.clone()
            // 腳
            this.combine_foot_corePartA = this.combine_thigh_corePartA.clone()
            this.combine_foot_corePartB = new THREE.Mesh(foot_corePartB,ML_DimGrey)
            this.combine_foot_corePartB.position.set(0,-10,0)
            // 裝甲後
            this.combine_foot_armorBack = new THREE.Mesh(foot_corePartB,ML_secondColor)
            this.combine_foot_armorBack.position.set(0,-18,-15)
            this.combine_foot_armorBack.scale.set(1.3,1,0.8)
            // 裝甲前
            this.combine_foot_armorForntA = new THREE.Mesh(foot_armorPartA)
            this.combine_foot_armorForntA.rotation.set(Math.PI*0.5,0,0)
            this.combine_foot_armorForntACut = new THREE.Mesh(foot_armorPartACut)
            this.combine_foot_armorForntACut.position.set(0,-10,0)
            this.foot_armorForntABSP = new ThreeBSP(this.combine_foot_armorForntA)
            this.foot_armorForntACutBSP = new ThreeBSP(this.combine_foot_armorForntACut)
            this.foot_armorForntAResult = this.foot_armorForntABSP.subtract(this.foot_armorForntACutBSP)
            this.combine_foot_armorForntAResult = this.foot_armorForntAResult.toMesh(ML_mainColor)
            this.combine_foot_armorForntAResult2 = this.foot_armorForntAResult.toMesh(ML_secondColor)
            this.combine_foot_armorForntAResult2.scale.set(1.5,1.5,1.2)
            this.combine_foot_armorForntAResult2.position.set(0,-10,5)
            this.footFront = new THREE.Group()
            this.footFront.add(this.combine_foot_armorForntAResult)
            this.footFront.add(this.combine_foot_armorForntAResult2)
            this.footFront.position.set(0,-18,30)
            this.footAll = new THREE.Group()
            this.footAll.add(this.combine_foot_corePartA)
            this.footAll.add(this.combine_foot_corePartB)
            this.footAll.add(this.combine_foot_armorBack)
            this.footAll.add(this.footFront)
            this.footAll.position.set(0,-140,0)
            // 右腳部分
            this.footAllRight = this.footAll.clone()
            // 左腳
            this.calfAll.add(this.footAll)
            this.legLeft = new THREE.Group()
            this.legLeft.add(this.thighAll)
            this.legLeft.add(this.calfAll)
            this.legLeft.position.set(22,-15,0)
            // 右腳
            this.calfAllRight.add(this.footAllRight)
            this.legRight = new THREE.Group()
            this.legRight.add(this.thighAllRight)
            this.legRight.add(this.calfAllRight)
            this.legRight.position.set(-22,-15,0)
            this.combine_waist_coreAll.add(this.legLeft)
            this.combine_waist_coreAll.add(this.legRight)

        // 4.全部組建
        // --------------------------------------------------------------------------------
            // 接合桿子
            this.Connection_handRodLeft = new THREE.Mesh(hand_rod,ML_DimGrey)
            this.Connection_handRodLeft.rotation.set(0,0,1.6)
            this.Connection_handRodLeft.position.set(40,5,-5)
            this.Connection_handRodRight = this.Connection_handRodLeft.clone()
            this.Connection_handRodRight.rotation.set(0,0,1.6)
            this.Connection_handRodRight.position.set(-40,5,-5)

            // 所有可動
            // A.頭部區塊
            // --------------------------------------------------------------------------------
                this.head.rotation.set(0,0,0)
            // B.身體區塊
            // --------------------------------------------------------------------------------
                this.body.rotation.set(0,0,0)
                // 下腰部
                this.combine_waist_coreAll.rotation.set(0,0,0)
                // 正面左邊裙甲轉動
                this.combine_waistALeft.rotation.set(0,0,0)
                // 正面右邊裙甲轉動
                this.combine_waistARight.rotation.set(0,0,0)
            // C.手部區塊
            // --------------------------------------------------------------------------------
                // 左手
                this.handLeft.rotation.set(0.2,0,0.1)
                this.handLeft.position.set(65,5,-5)
                // 二頭肌
                this.combine_hand_armAll.rotation.set(0,0,0)
                // 手腕
                this.combine_hand_wristAllLeft.rotation.set(-Math.PI*0.25,0,0)
                // 手掌
                this.combine_hand_plamAll_left.rotation.set(0,-Math.PI*0.1,0)
                // 手指(拇指)
                this.combine_hand_fingerMainAll_Left.rotation.set(0,0,-Math.PI*0.3)
                this.combine_hand_fingerMainAll_Left.position.set(-6,-2,12)
                // 手指(其他四指)
                this.combine_hand_fingerAll_left.position.set(-2,-12,7)
                this.combine_hand_fingerAll_left2.position.set(-3,-12,2)
                this.combine_hand_fingerAll_left3.position.set(-3,-12,-3)
                this.combine_hand_fingerAll_left4.position.set(-2,-12,-8)
                // this.combine_hand_fingerAll_left.rotation.set(0,0,-Math.PI*0.1)
                // --------------------------------------------------------------------------------
                // 右手
                this.handRight.rotation.set(0.2,0,-0.1)
                this.handRight.position.set(-65,5,-5)
                // 二頭肌
                this.combine_hand_armAllRight.rotation.set(0,0,0)
                // 手腕
                this.combine_hand_wristAllRight.rotation.set(-Math.PI*0.25,0,0)
                // 手掌
                this.combine_hand_plamAll_Right.rotation.set(0,Math.PI*0.1,0)
                // 手指(拇指)
                this.combine_hand_fingerMainAll_Right.rotation.set(0,0,Math.PI*0.3)
                this.combine_hand_fingerMainAll_Right.position.set(6,-2,12)
                // 手指(其他四指)
                this.combine_hand_fingerAll_Right.position.set(2,-12,7)
                this.combine_hand_fingerAll_Right2.position.set(3,-12,2)
                this.combine_hand_fingerAll_Right3.position.set(3,-12,-3)
                this.combine_hand_fingerAll_Right4.position.set(2,-12,-8)
                // D.腳部區塊
            // --------------------------------------------------------------------------------
                // 左腳
                this.legLeft.rotation.set(-Math.PI*0.05,0,Math.PI*0.05)
                // 小腿
                this.calfAll.rotation.set(Math.PI*0.1,0,0)
                // 腳底
                this.footAll.rotation.set(-Math.PI*0.05,0,-Math.PI*0.025)
                // --------------------------------------------------------------------------------
                // 右腳
                this.legRight.rotation.set(-Math.PI*0.05,0,-Math.PI*0.05)
                // 小腿
                this.calfAllRight.rotation.set(Math.PI*0.1,0,0)
                // 腳底
                this.footAllRight.rotation.set(-Math.PI*0.05,0,Math.PI*0.025)


            // ----------------------------------------
            this.Allmobile = new THREE.Group()
            this.Allmobile.add(this.head)
            this.Allmobile.add(this.body)
            this.Allmobile.add(this.Connection_handRodLeft)
            this.Allmobile.add(this.Connection_handRodRight)
            this.Allmobile.add(this.handLeft)
            this.Allmobile.add(this.handRight)
            this.Allmobile.add(this.ejectorAll)
            this.Allmobile.rotation.set(0,-Math.PI*0.2,0)
            this.Allmobile.position.set(0,10,0)
            this.Allmobile.scale.set(1,1,1)

        this.Allmobile.traverse(function(object){
            if (object instanceof THREE.Mesh) {
                object.castShadow = true
                object.receiveShadow = true
            }
        })
    }
}

function gundam(){
    gundamObj = new Gundam()
    scene.add(gundamObj.Allmobile)
}

// 初始
function init() {
    // 場景
    scene = new THREE.Scene()
    // 渲染
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
    renderer.setSize(window.innerWidth,window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = 2
    renderer.setClearAlpha(0.5)
    document.body.appendChild(renderer.domElement)

    // 相機
    camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,1500)
    camera.position.set(0,100,250)
    camera.lookAt(scene.position)
    // 三視角
    cameraControl = new THREE.OrbitControls(camera)
    cameraControl.enableDamping = true
    cameraControl.dampingFactor = 0.25
    cameraControl.minDistance = 0
    cameraControl.maxDistance = 500
    cameraControl.enablePan = false// 關閉右鍵
    cameraControl.rotateSpeed = 0.1// 左鍵速度
    cameraControl.zoomSpeed = 0.6


    // 設置環境光提供輔助柔和白光
    let ambientLight = new THREE.AmbientLight({color:"rgb(255,255,255)"},0.7)
    let directionalLight = new THREE.DirectionalLight({color:"rgb(255,255,255)"},0.6)
    let directionalLight2 = directionalLight.clone()
    directionalLight.position.set(0,-150,200)
    directionalLight2.position.set(0,0,-200)

    // 增加到場景
    scene.add(ambientLight)
    scene.add(directionalLight)
    scene.add(directionalLight2)
    gundam()
}

function render(){
    cameraControl.update()
    requestAnimationFrame(render)
    renderer.render(scene,camera)
}

// RWD
window.addEventListener('resize',function(){
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth,window.innerHeight)
})

init()
render()

// 點擊區塊設定
document.getElementById("Btnlist").addEventListener("mouseover",function(){
    cameraControl.enableZoom = false // 關閉zoom
})
document.getElementById("Btnlist").addEventListener("mouseout",function(){
    cameraControl.enableZoom = true // 開啟zoom
})


var songEffect = new Audio("media/mech-manuever.mp3")
// 鏡頭操作
// 往上
document.getElementById("bodyUP").addEventListener("click",function(){
    songEffect.play()
    this.classList.add("unclick")
    let start = setInterval(function(){
        gundamObj.Allmobile.position.y += 0.2
        setTimeout(function(){
            clearInterval(start)
        },1000)
    })
    setTimeout(function(){
        document.getElementById("bodyUP").classList.remove("unclick")
    },1010)
})
// 往下
document.getElementById("bodyDown").addEventListener("click",function(){
    songEffect.play()
    this.classList.add("unclick")
    let start = setInterval(function(){
        gundamObj.Allmobile.position.y -= 0.2
        setTimeout(function(){
            clearInterval(start)
        },1000)
    })
    setTimeout(function(){
        document.getElementById("bodyDown").classList.remove("unclick")
    },1010)
})
// 左翻
document.getElementById("bodyFlipLeft").addEventListener("click",function(){
    songEffect.play()
    this.classList.add("unclick")
    let start = setInterval(function(){
        gundamObj.Allmobile.rotation.z -= 0.002
        setTimeout(function(){
            clearInterval(start)
        },1000)
    })
    setTimeout(function(){
        document.getElementById("bodyFlipLeft").classList.remove("unclick")
    },1010)
})
// 右翻
document.getElementById("bodyFlipRight").addEventListener("click",function(){
    songEffect.play()
    this.classList.add("unclick")
    let start = setInterval(function(){
        gundamObj.Allmobile.rotation.z += 0.002
        setTimeout(function(){
            clearInterval(start)
        },1000)
    })
    setTimeout(function(){
        document.getElementById("bodyFlipRight").classList.remove("unclick")
    },1010)
})

// 頭部操作功能
var headActionX = false
var headActionLeft = false
var headActionRight = false
// 抬頭
document.getElementById("headX").addEventListener("click",function(){
    songEffect.play()
    headActionX = !headActionX
    this.classList.add("unclick")
    if(headActionX){
        let start = setInterval(function(){
            gundamObj.head.rotation.x -= 0.001
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    if(!headActionX) {
        let start = setInterval(function(){
            gundamObj.head.rotation.x += 0.001
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    setTimeout(function(){
        document.getElementById("headX").classList.remove("unclick")
    },1010)
})
// 往左動
document.getElementById("headLeft").addEventListener("click",function(){
    songEffect.play()
    headActionLeft = !headActionLeft
    this.classList.add("unclick")
    document.getElementById("headRight").classList.add("unclick")
    if(headActionLeft){
        let start = setInterval(function(){
            gundamObj.head.rotation.y += 0.002
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    if(!headActionLeft) {
        let start = setInterval(function(){
            gundamObj.head.rotation.y -= 0.002
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
        setTimeout(function(){
            document.getElementById("headRight").classList.remove("unclick")
        },1010)
    }
    setTimeout(function(){
        document.getElementById("headLeft").classList.remove("unclick")
    },1010)
})
// 往右動
document.getElementById("headRight").addEventListener("click",function(){
    songEffect.play()
    headActionRight = !headActionRight
    this.classList.add("unclick")
    document.getElementById("headLeft").classList.add("unclick")
    if(headActionRight){
        let start = setInterval(function(){
            gundamObj.head.rotation.y -= 0.002
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    if(!headActionRight) {
        let start = setInterval(function(){
            gundamObj.head.rotation.y += 0.002
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
        setTimeout(function(){
            document.getElementById("headLeft").classList.remove("unclick")
        },1010)
    }
    setTimeout(function(){
        document.getElementById("headRight").classList.remove("unclick")
    },1010)
})

// 腰部操作功能
var waistActionLeft = false
var waistActionRight = false
// 往左動
document.getElementById("waistLeft").addEventListener("click",function(){
    songEffect.play()
    waistActionLeft = !waistActionLeft
    this.classList.add("unclick")
    document.getElementById("waistRight").classList.add("unclick")
    if(waistActionLeft){
        let start = setInterval(function(){
            gundamObj.combine_waist_coreAll.rotation.y += 0.002
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    if(!waistActionLeft) {
        let start = setInterval(function(){
            gundamObj.combine_waist_coreAll.rotation.y -= 0.002
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
        setTimeout(function(){
            document.getElementById("waistRight").classList.remove("unclick")
        },1010)
    }
    setTimeout(function(){
        document.getElementById("waistLeft").classList.remove("unclick")
    },1010)
})
// 往右動
document.getElementById("waistRight").addEventListener("click",function(){
    songEffect.play()
    waistActionRight = !waistActionRight
    this.classList.add("unclick")
    document.getElementById("waistLeft").classList.add("unclick")
    if(waistActionRight){
        let start = setInterval(function(){
            gundamObj.combine_waist_coreAll.rotation.y -= 0.002
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    if(!waistActionRight) {
        let start = setInterval(function(){
            gundamObj.combine_waist_coreAll.rotation.y += 0.002
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
        setTimeout(function(){
            document.getElementById("waistLeft").classList.remove("unclick")
        },1010)
    }
    setTimeout(function(){
        document.getElementById("waistRight").classList.remove("unclick")
    },1010)
})
// 腿部
// 左
var tighLeftAction = false
var calfLeftAction = false
var footLeftAction = false
// 大腿
document.getElementById("legTighLeft").addEventListener("click",function(){
    songEffect.play()
    tighLeftAction = !tighLeftAction
    this.classList.add("unclick")
    if(tighLeftAction){
        let start = setInterval(function(){
            gundamObj.legLeft.rotation.x -= 0.003
            gundamObj.combine_waistALeft.rotation.x -=0.003
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    if(!tighLeftAction) {
        let start = setInterval(function(){
            gundamObj.legLeft.rotation.x += 0.003
            gundamObj.combine_waistALeft.rotation.x +=0.003
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    setTimeout(function(){
        document.getElementById("legTighLeft").classList.remove("unclick")
    },1010)
})
// 小腿
document.getElementById("legCalfLeft").addEventListener("click",function(){
    songEffect.play()
    calfLeftAction = !calfLeftAction
    this.classList.add("unclick")
    if(calfLeftAction){
        let start = setInterval(function(){
            gundamObj.calfAll.rotation.x += 0.004
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    if(!calfLeftAction) {
        let start = setInterval(function(){
            gundamObj.calfAll.rotation.x -= 0.004
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    setTimeout(function(){
        document.getElementById("legCalfLeft").classList.remove("unclick")
    },1010)
})
// 腳
document.getElementById("legFootLeft").addEventListener("click",function(){
    songEffect.play()
    footLeftAction = !footLeftAction
    this.classList.add("unclick")
    if(footLeftAction){
        let start = setInterval(function(){
            gundamObj.footAll.rotation.x -= 0.001
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    if(!footLeftAction) {
        let start = setInterval(function(){
            gundamObj.footAll.rotation.x += 0.001
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    setTimeout(function(){
        document.getElementById("legFootLeft").classList.remove("unclick")
    },1010)
})


// 右
var tighRightAction = false
var calfRightAction = false
var footRightAction = false
// 大腿
document.getElementById("legTighRight").addEventListener("click",function(){
    songEffect.play()
    tighRightAction = !tighRightAction
    this.classList.add("unclick")
    if(tighRightAction){
        let start = setInterval(function(){
            gundamObj.legRight.rotation.x -= 0.003
            gundamObj.combine_waistARight.rotation.x -=0.003
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    if(!tighRightAction) {
        let start = setInterval(function(){
            gundamObj.legRight.rotation.x += 0.003
            gundamObj.combine_waistARight.rotation.x +=0.003
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    setTimeout(function(){
        document.getElementById("legTighRight").classList.remove("unclick")
    },1010)
})
// 小腿
document.getElementById("legCalfRight").addEventListener("click",function(){
    songEffect.play()
    calfRightAction = !calfRightAction
    this.classList.add("unclick")
    if(calfRightAction){
        let start = setInterval(function(){
            gundamObj.calfAllRight.rotation.x += 0.004
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    if(!calfRightAction) {
        let start = setInterval(function(){
            gundamObj.calfAllRight.rotation.x -= 0.004
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    setTimeout(function(){
        document.getElementById("legCalfRight").classList.remove("unclick")
    },1010)
})
// 腳
document.getElementById("legFootRight").addEventListener("click",function(){
    songEffect.play()
    footRightAction = !footRightAction
    this.classList.add("unclick")
    if(footRightAction){
        let start = setInterval(function(){
            gundamObj.footAllRight.rotation.x -= 0.001
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    if(!footRightAction) {
        let start = setInterval(function(){
            gundamObj.footAllRight.rotation.x += 0.001
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    setTimeout(function(){
        document.getElementById("legFootRight").classList.remove("unclick")
    },1010)
})

// 手部
// 左
var handAllLeftAction = false
var handAllSideLeftAction = false
var handArmLeftAction = false
var handWristLeftAction = false
var handWristLeftAction = false
var handWristTwistLeftAction = false
var handPlamLeftAction = false
// 平舉
document.getElementById("handAllLeft").addEventListener("click",function(){
    songEffect.play()
    handAllLeftAction = !handAllLeftAction
    this.classList.add("unclick")
    if(handAllLeftAction){
        let start = setInterval(function(){
            gundamObj.handLeft.rotation.x -= 0.005
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    if(!handAllLeftAction){
        let start = setInterval(function(){
            gundamObj.handLeft.rotation.x += 0.005
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })  
    }
    setTimeout(function(){
        document.getElementById("handAllLeft").classList.remove("unclick")
    },1010)
})
// 側舉
document.getElementById("handAllSideLeft").addEventListener("click",function(){
    songEffect.play()
    handAllSideLeftAction = !handAllSideLeftAction
    this.classList.add("unclick")
    if(handAllSideLeftAction){
        let start = setInterval(function(){
            gundamObj.handLeft.rotation.z += 0.004
            gundamObj.combine_shoulderArmyResultLeft.rotation.z -= 0.004
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    if(!handAllSideLeftAction){
        let start = setInterval(function(){
            gundamObj.handLeft.rotation.z -= 0.004
            gundamObj.combine_shoulderArmyResultLeft.rotation.z += 0.004
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })  
    }
    setTimeout(function(){
        document.getElementById("handAllSideLeft").classList.remove("unclick")
    },1010)
})
// 二頭肌
document.getElementById("handArmLeft").addEventListener("click",function(){
    songEffect.play()
    handArmLeftAction = !handArmLeftAction
    this.classList.add("unclick")
    if(handArmLeftAction){
        let start = setInterval(function(){
            gundamObj.combine_hand_armAll.rotation.y += 0.005
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    if(!handArmLeftAction){
        let start = setInterval(function(){
            gundamObj.combine_hand_armAll.rotation.y -= 0.005
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })  
    }
    setTimeout(function(){
        document.getElementById("handArmLeft").classList.remove("unclick")
    },1010)
})
// 手腕
document.getElementById("handWristLeft").addEventListener("click",function(){
    songEffect.play()
    handWristLeftAction = !handWristLeftAction
    this.classList.add("unclick")
    if(handWristLeftAction){
        let start = setInterval(function(){
            gundamObj.combine_hand_wristAllLeft.rotation.x -= 0.003
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    if(!handWristLeftAction){
        let start = setInterval(function(){
            gundamObj.combine_hand_wristAllLeft.rotation.x += 0.003
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })  
    }
    setTimeout(function(){
        document.getElementById("handWristLeft").classList.remove("unclick")
    },1010)
})
// 手腕(扭)
document.getElementById("handWristTwistLeft").addEventListener("click",function(){
    songEffect.play()
    handWristTwistLeftAction = !handWristTwistLeftAction
    this.classList.add("unclick")
    if(handWristTwistLeftAction){
        let start = setInterval(function(){
            gundamObj.combine_hand_wristAllLeft.rotation.y += 0.005
            gundamObj.combine_hand_elbowAll.rotation.y -= 0.005
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    if(!handWristTwistLeftAction){
        let start = setInterval(function(){
            gundamObj.combine_hand_wristAllLeft.rotation.y -= 0.005
            gundamObj.combine_hand_elbowAll.rotation.y += 0.005
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })  
    }
    setTimeout(function(){
        document.getElementById("handWristTwistLeft").classList.remove("unclick")
    },1010)
})
// 手掌
document.getElementById("handPlamLeft").addEventListener("click",function(){
    songEffect.play()
    handPlamLeftAction = !handPlamLeftAction
    if(handPlamLeftAction){
        let start = setInterval(function(){
            gundamObj.combine_hand_plamAll_left.rotation.y -= 0.005
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    if(!handPlamLeftAction){
        let start = setInterval(function(){
            gundamObj.combine_hand_plamAll_left.rotation.y += 0.005
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    this.classList.add("unclick")
    setTimeout(function(){
        document.getElementById("handPlamLeft").classList.remove("unclick")
    },1010)
})

// 右
var handAllRightAction = false
var handAllSideRightAction = false
var handArmRightAction = false
var handWristRightAction = false
var handWristTwistRightAction = false
var handPlamRightAction = false
// 平舉
document.getElementById("handAllRight").addEventListener("click",function(){
    songEffect.play()
    handAllRightAction = !handAllRightAction
    this.classList.add("unclick")
    if(handAllRightAction){
        let start = setInterval(function(){
            gundamObj.handRight.rotation.x -= 0.005
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    if(!handAllRightAction){
        let start = setInterval(function(){
            gundamObj.handRight.rotation.x += 0.005
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })  
    }
    setTimeout(function(){
        document.getElementById("handAllRight").classList.remove("unclick")
    },1010)
})
// 側舉
document.getElementById("handAllSideRight").addEventListener("click",function(){
    songEffect.play()
    handAllSideRightAction = !handAllSideRightAction
    this.classList.add("unclick")
    if(handAllSideRightAction){
        let start = setInterval(function(){
            gundamObj.handRight.rotation.z -= 0.004
            gundamObj.combine_shoulderArmyResultRight.rotation.z -= 0.004
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    if(!handAllSideRightAction){
        let start = setInterval(function(){
            gundamObj.handRight.rotation.z += 0.004
            gundamObj.combine_shoulderArmyResultRight.rotation.z += 0.004
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })  
    }
    setTimeout(function(){
        document.getElementById("handAllSideRight").classList.remove("unclick")
    },1010)
})
// 二頭肌
document.getElementById("handArmRight").addEventListener("click",function(){
    songEffect.play()
    handArmRightAction = !handArmRightAction
    this.classList.add("unclick")
    if(handArmRightAction){
        let start = setInterval(function(){
            gundamObj.combine_hand_armAllRight.rotation.y -= 0.005
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    if(!handArmRightAction){
        let start = setInterval(function(){
            gundamObj.combine_hand_armAllRight.rotation.y += 0.005
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })  
    }
    setTimeout(function(){
        document.getElementById("handArmRight").classList.remove("unclick")
    },1010)
})
// 手腕
document.getElementById("handWristRight").addEventListener("click",function(){
    songEffect.play()
    handWristRightAction = !handWristRightAction
    this.classList.add("unclick")
    if(handWristRightAction){
        let start = setInterval(function(){
            gundamObj.combine_hand_wristAllRight.rotation.x -= 0.003
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    if(!handWristRightAction){
        let start = setInterval(function(){
            gundamObj.combine_hand_wristAllRight.rotation.x += 0.003
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })  
    }
    setTimeout(function(){
        document.getElementById("handWristRight").classList.remove("unclick")
    },1010)
})
// 手腕(扭)
document.getElementById("handWristTwistRight").addEventListener("click",function(){
    songEffect.play()
    handWristTwistRightAction = !handWristTwistRightAction
    this.classList.add("unclick")
    if(handWristTwistRightAction){
        let start = setInterval(function(){
            gundamObj.combine_hand_wristAllRight.rotation.y -= 0.005
            gundamObj.combine_hand_elbowAllRight.rotation.y += 0.005
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    if(!handWristTwistRightAction){
        let start = setInterval(function(){
            gundamObj.combine_hand_wristAllRight.rotation.y += 0.005
            gundamObj.combine_hand_elbowAllRight.rotation.y -= 0.005
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })  
    }
    setTimeout(function(){
        document.getElementById("handWristTwistRight").classList.remove("unclick")
    },1010)
})
// 手掌
document.getElementById("handPlamRight").addEventListener("click",function(){
    songEffect.play()
    handPlamRightAction = !handPlamRightAction
    if(handPlamRightAction){
        let start = setInterval(function(){
            gundamObj.combine_hand_plamAll_Right.rotation.y += 0.005
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    if(!handPlamRightAction){
        let start = setInterval(function(){
            gundamObj.combine_hand_plamAll_Right.rotation.y -= 0.005
            setTimeout(function(){
                clearInterval(start)
            },1000)
        })
    }
    this.classList.add("unclick")
    setTimeout(function(){
        document.getElementById("handPlamRight").classList.remove("unclick")
    },1010)
})

var lightingEffect = new Audio("media/lighting.mp3")
lightingEffect.volume = 0.5
// 閃光
var lightingAction = false 
document.getElementById("lighting").addEventListener("click",function(){
    lightingEffect.play()
    lightingAction = !lightingAction
    this.classList.add("unclick")
    if(lightingAction){
        let start = setInterval(function(){
            gundamObj.light_eyeLeft.power += 0.3
            gundamObj.light_eyeRight.power += 0.3
            gundamObj.light_headLight.power += 0.1
            setTimeout(function(){
                clearInterval(start)
            },3000)
        })
    }
    if(!lightingAction){
        let start = setInterval(function(){
            gundamObj.light_eyeLeft.power -= 0.3
            gundamObj.light_eyeRight.power -= 0.3
            gundamObj.light_headLight.power -= 0.1
            setTimeout(function(){
                clearInterval(start)
            },3000)
        })
    }
    setTimeout(function(){
        document.getElementById("lighting").classList.remove("unclick")
    },3010)
})

// 變色效果
// 主要色
// red
document.getElementById("main_redColor").addEventListener("click",function(){
    ML_mainColor.color.setStyle("#fc0000")
})
// blue
document.getElementById("main_blueColor").addEventListener("click",function(){
    ML_mainColor.color.setStyle("#27408c")
})
// green
document.getElementById("main_greenColor").addEventListener("click",function(){
    ML_mainColor.color.setStyle("#4CAF4B")
})
// white
document.getElementById("main_whiteColor").addEventListener("click",function(){
    ML_mainColor.color.setStyle("#FBFFEB")
})
// gray
document.getElementById("main_grayColor").addEventListener("click",function(){
    ML_mainColor.color.setStyle("#363A3A")
})
// yellow
document.getElementById("main_yellowColor").addEventListener("click",function(){
    ML_mainColor.color.setStyle("#ffff00")
})

// 次要色
// red
document.getElementById("second_redColor").addEventListener("click",function(){
    ML_secondColor.color.setStyle("#fc0000")
})
// blue
document.getElementById("second_blueColor").addEventListener("click",function(){
    ML_secondColor.color.setStyle("#27408c")
})
// green
document.getElementById("second_greenColor").addEventListener("click",function(){
    ML_secondColor.color.setStyle("#4CAF4B")
})
// white
document.getElementById("second_whiteColor").addEventListener("click",function(){
    ML_secondColor.color.setStyle("#FBFFEB")
})
// gray
document.getElementById("second_grayColor").addEventListener("click",function(){
    ML_secondColor.color.setStyle("#363A3A")
})
// yellow
document.getElementById("second_yellowColor").addEventListener("click",function(){
    ML_secondColor.color.setStyle("#ffff00")
})

// 燈光
// red
document.getElementById("light_redColor").addEventListener("click",function(){
    ML_lightingColor.color.setStyle("#fc0000")
})
// green
document.getElementById("light_greenColor").addEventListener("click",function(){
    ML_lightingColor.color.setStyle("#00ff7f")
})
// yellow
document.getElementById("light_yellowColor").addEventListener("click",function(){
    ML_lightingColor.color.setStyle("#ffff00")
})

var BGM = new Audio("media/BGM.mp3")
BGM.volume = 0.2
// 開始
document.getElementById("startBtn").addEventListener("click",function(){
    BGM.play()
    document.getElementById("cover").classList.add("toggle")
    setTimeout(function(){
    document.getElementById("cover").style.display= "none"
    },990)
})