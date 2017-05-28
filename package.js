Package.describe({
    name: 'jayuda:flx-report',
    version: '0.2.7',
    summary: "Automatic Generate Report Template From collections ",
    git: 'https://github.com/Jayuda/flx-report',
    documentation: 'README.md'
});

Package.onUse(function(api){
    api.versionsFrom('1.1.0.2');
    api.use([
        'ui',
        'meteor-platform',
        'jayuda:flx-qrcode@0.0.1'
    ]);
    api.imply('templating');
    api.addFiles([
        'client/flxreport.html',
        'client/flxreport.js',
        'client/flxreport.css'
    ], 'client');
});
