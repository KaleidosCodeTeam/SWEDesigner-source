/**
 *	@file Main utile per RequireJS
 *	@author Pezzuto Francesco, Sovilla Matteo - KaleidosCode
 */
require.config({
	baseUrl: './',
	paths: {
		jquery: 'lib/js/jquery.min',
		lodash: 'lib/js/lodash.min',
		backbone: 'lib/js/backbone-min',
		joint: 'lib/js/joint.min',
		text: 'lib/js/text',
		jsonfn: 'lib/js/jsonfn.min'
		// SE CI SONO ALTRE LIBRERIE, AGGIUNGERLE
	},
	map: {
		'*': {
			'underscore': 'lodash'
		}
	}
});

require([
'js/test/views/EditPanelViewTest',
'js/test/views/PathViewTest',
'js/test/views/ProjectViewTest',
'js/test/views/TitlebarViewTest',
'js/test/views/ToolbarViewTest',
'js/test/models/DataManagerTest',
'js/test/models/ProjectTest',
'js/test/models/ProjectModelTest',
'js/test/models/RequestHandlerTest',,
'js/test/models/ToolbarModelTest',
'js/test/models/items/PackageTest',
'js/test/models/items/PkgCommentTest',
'js/test/models/items/packageDiagramLinkTest',
'js/test/models/items/PkgCommentLinkTest',
'js/test/models/items/PkgDependencyTest',
'js/test/models/items/ClassTest',
'js/test/models/items/InterfaceTest',
'js/test/models/items/ClCommentTest',
'js/test/models/items/classDiagramLinkTest',
'js/test/models/items/ClCommentLinkTest',
'js/test/models/items/GeneralizationTest',
'js/test/models/items/ImplementationTest',
'js/test/models/items/AggregationTest',
'js/test/models/items/CompositionTest',
'js/test/models/items/AssociationTest',
'js/test/models/items/customBubbleTest',
'js/test/models/items/bubbleIfTest',
'js/test/models/items/bubbleElseTest',
'js/test/models/items/bubbleForTest',
'js/test/models/items/bubbleReturnTest',
'js/test/models/items/bubbleStartTest',
'js/test/models/items/bubbleWhileTest',
'js/test/models/items/bubbleDiagramLinkTest',
'js/test/models/items/bubbleLinkTest'
], function(EditPanelViewTest, PathViewTest, ProjectViewTest, TitlebarViewTest, ToolbarViewTest, DataManagerTest, ProjectTest, ProjectModelTest, RequestHandlerTest, PackageTest, PkgCommentTest, packageDiagramLinkTest, PkgCommentLinkTest, PkgDependencyTest, ClassTest, InterfaceTest,  classDiagramLinkTest, ClCommentLinkTest, GeneralizationTest, ImplementationTest, AggregationTest, CompositionTest, AssociationTest, customBubbleTest, bubbleIfTest, bubbleElseTest, bubbleForTest, bubbleReturnTest, bubbleStartTest, bubbleWhileTest, bubbleDiagramLinkTest, bubbleLinkTest) {
});
