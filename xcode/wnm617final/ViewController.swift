//
//  ViewController.swift
//  wnm617final
//
//  Created by Ziguang Wang on 12/15/17.
//  Copyright © 2017 Ziguang Wang. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    @IBOutlet weak var webview: UIWebView!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        let weburl = URL(string: "https://www.adenwang.com/wnm617/auth.html")
        let urlrequest = URLRequest(url: weburl!)
        webview.loadRequest(urlrequest)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}

